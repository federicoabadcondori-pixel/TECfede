
import React, { useState, useRef } from 'react';
import { Upload, FileText, Link, ArrowRight, X } from 'lucide-react';
import { generateStudySession } from '../geminiService';
import { StudySession } from '../types';

interface Props {
  onSessionGenerated: (session: StudySession) => void;
  setLoading: (loading: boolean) => void;
}

const FileUploader: React.FC<Props> = ({ onSessionGenerated, setLoading }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      let result;
      if (file) {
        if (file.type.startsWith('image/')) {
          const base64 = await fileToBase64(file);
          result = await generateStudySession(base64, true);
        } else {
          // For simplicity in this demo, treat text files as text
          const content = await file.text();
          result = await generateStudySession(content);
        }
      } else if (text) {
        result = await generateStudySession(text);
      }
      
      if (result) onSessionGenerated(result);
    } catch (err) {
      console.error(err);
      alert("Something went wrong generating your session. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Load Study Material</h2>
        <p className="text-slate-500">Paste text, upload images or documents to begin.</p>
      </div>

      <div className="space-y-6">
        {/* Text Area */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-4 text-indigo-600 font-bold">
            <FileText className="w-5 h-5" />
            <span>Paste Content</span>
          </div>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-48 p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 text-slate-700 resize-none transition-all"
            placeholder="Paste your lecture notes, book snippets, or article text here..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-8 bg-white border-2 border-dashed border-slate-200 rounded-3xl hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
          >
            <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2" />
            <span className="text-sm font-semibold text-slate-600">Upload File</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,text/plain" 
            />
          </button>
          
          <button className="flex flex-col items-center justify-center p-8 bg-white border-2 border-dashed border-slate-200 rounded-3xl hover:border-indigo-400 hover:bg-indigo-50 transition-all group opacity-50 cursor-not-allowed">
            <Link className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-sm font-semibold text-slate-600">Web Link</span>
          </button>
        </div>

        {file && (
          <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <div className="flex items-center space-x-3">
              <FileText className="text-indigo-600" />
              <span className="font-medium text-slate-700 truncate max-w-[200px]">{file.name}</span>
            </div>
            <button onClick={() => setFile(null)} className="p-1 hover:bg-indigo-100 rounded-full">
              <X className="w-4 h-4 text-indigo-600" />
            </button>
          </div>
        )}

        <button 
          onClick={handleGenerate}
          disabled={!text && !file}
          className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <span>Generate Study Pack</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
