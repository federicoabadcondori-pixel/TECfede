
import { GoogleGenAI, Type } from "@google/genai";
import { StudySession, QuizQuestion, Flashcard, MindMapNode } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStudySession = async (
  input: string, 
  isImage: boolean = false
): Promise<StudySession> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Transform the following academic content into a structured learning session.
    Extract key concepts, provide a concise summary, generate 5 diverse quiz questions (multiple choice, true/false), 
    5 flashcards, and a hierarchical mind map structure.
    
    Output must be a JSON object with the following structure:
    {
      "title": "Clear concise title",
      "summary": "Educational summary",
      "concepts": ["concept1", "concept2"],
      "quizzes": [
        { "id": "q1", "type": "multiple-choice", "question": "...", "options": ["a", "b", "c"], "answer": "...", "explanation": "..." }
      ],
      "flashcards": [
        { "id": "f1", "front": "...", "back": "..." }
      ],
      "mindMap": { "id": "root", "label": "Topic", "children": [{ "id": "c1", "label": "Subtopic", "children": [] }] }
    }
  `;

  let response;
  if (isImage) {
    response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: input } },
          { text: prompt }
        ]
      },
      config: { 
        responseMimeType: "application/json",
        temperature: 0.7 
      }
    });
  } else {
    response = await ai.models.generateContent({
      model,
      contents: prompt + "\n\nContent:\n" + input,
      config: { 
        responseMimeType: "application/json",
        temperature: 0.7 
      }
    });
  }

  const result = JSON.parse(response.text || '{}');
  return {
    ...result,
    id: Date.now().toString()
  };
};

export const getSearchGrounding = async (query: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Find additional academic context and recent facts about: ${query}`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text;
};
