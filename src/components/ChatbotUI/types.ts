export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface ChatbotUIProps {
  title?: string;
  initialMessages?: Message[];
  placeholderText?: string;
}