
export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  children: MindMapNode[];
}

export interface StudySession {
  id: string;
  title: string;
  summary: string;
  quizzes: QuizQuestion[];
  flashcards: Flashcard[];
  mindMap: MindMapNode;
  concepts: string[];
}

export interface UserStats {
  points: number;
  level: number;
  badges: Badge[];
  streak: number;
  completedSessions: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export type ViewType = 'dashboard' | 'upload' | 'study' | 'quiz' | 'flashcards' | 'mindmap' | 'stats';
