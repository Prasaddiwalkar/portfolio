import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage?: (message: string) => Promise<string>;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you learn more about Prasad's background, skills, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      let aiResponseText: string;
      
      if (onSendMessage) {
        // Use external AI service (RAG integration)
        aiResponseText = await onSendMessage(currentInput);
      } else {
        // Fallback response when no AI service is provided
        aiResponseText = "I'm ready to help! Please integrate an AI service to provide personalized responses about Prasad's portfolio.";
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay">
      <div className="ai-chat-container">
        <div className="ai-chat-header">
          <div className="ai-chat-title">
            <div className="ai-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A2,2 0 0,1 14,4V8A2,2 0 0,1 12,10A2,2 0 0,1 10,8V4A2,2 0 0,1 12,2M12,12A8,8 0 0,1 20,20H4A8,8 0 0,1 12,12M12,14A6,6 0 0,0 6,20H18A6,6 0 0,0 12,14M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M14,6A1,1 0 0,0 13,7A1,1 0 0,0 14,8A1,1 0 0,0 15,7A1,1 0 0,0 14,6Z" />
              </svg>
            </div>
            <div>
              <h3>AI Assistant</h3>
              <span className="ai-status">Online</span>
            </div>
          </div>
          <button className="ai-chat-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="ai-chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`ai-message ${message.isUser ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="ai-message ai-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-chat-input">
          <div className="input-container">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about Prasad's experience, skills, or projects..."
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="send-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
