import React, { useState, useRef, useEffect } from 'react';
import { getStaticResponse, suggestedQuestions } from '../../services/staticChatService';

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
      text: "Hi! I'm your AI assistant. I can help you learn more about Prasad's background, skills, and experience. Please use the suggested questions below to get started!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const currentInput = messageText || inputValue;
    if (!currentInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Track asked questions for suggested questions filtering
    if (messageText && suggestedQuestions.includes(messageText)) {
      setAskedQuestions(prev => new Set(Array.from(prev).concat(messageText)));
    }

    try {
      let aiResponseText: string;
      
      if (onSendMessage) {
        // Use external AI service (RAG integration)
        aiResponseText = await onSendMessage(currentInput);
      } else {
        // Use static responses based on portfolio data
        aiResponseText = getStaticResponse(currentInput);
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Show remaining suggestions after AI responds
      setTimeout(() => {
        setShowSuggestions(true);
      }, 1000);
      
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

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleRestart = () => {
    setMessages([
      {
        id: '1',
        text: "Hi! I'm your AI assistant. I can help you learn more about Prasad's background, skills, and experience. Please use the suggested questions below to get started!",
        isUser: false,
        timestamp: new Date()
      }
    ]);
    setAskedQuestions(new Set());
    setShowSuggestions(true);
    setInputValue('');
  };

  // Filter out already asked questions
  const remainingSuggestions = suggestedQuestions.filter(q => !askedQuestions.has(q));

  // Format message text with basic markdown support
  const formatMessageText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/• /g, '• ') // Bullet points
      .replace(/\n/g, '<br/>') // Line breaks
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'); // Links
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
              <div className="ai-avatar-animated">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ai-chatbot-icon">
                  {/* Robot head/body */}
                  <rect 
                    x="5" y="7" width="14" height="12" 
                    rx="3" ry="3" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    fill="none"
                    className="chatbot-body"
                  />
                  
                  {/* Antenna */}
                  <line x1="12" y1="7" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" className="antenna"/>
                  <circle cx="12" cy="4" r="1" fill="currentColor" className="antenna-tip"/>
                  
                  {/* Eyes */}
                  <circle cx="9" cy="11" r="1.5" fill="currentColor" className="eye eye-left"/>
                  <circle cx="15" cy="11" r="1.5" fill="currentColor" className="eye eye-right"/>
                  
                  {/* Mouth/speaker */}
                  <rect x="8" y="15" width="8" height="2" rx="1" fill="currentColor" className="mouth"/>
                  
                  {/* Chat bubble indicator */}
                  <circle cx="20" cy="8" r="2" fill="currentColor" className="chat-indicator" opacity="0.8"/>
                  <circle cx="20" cy="8" r="1" fill="white" className="chat-dot"/>
                </svg>
                <div className="ai-pulse-ring"></div>
              </div>
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
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: message.isUser ? message.text : formatMessageText(message.text) 
                  }}
                />
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
          
          {/* Suggested Questions */}
          {showSuggestions && !isLoading && (
            <div className="suggested-questions">
              <div className="suggestions-header">
                <div className="suggestions-title">
                  <p>{remainingSuggestions.length === suggestedQuestions.length ? "Popular questions:" : "More questions you can ask:"}</p>
                  {messages.length > 1 && (
                    <button 
                      className="restart-button"
                      onClick={handleRestart}
                      title="Restart conversation"
                    >
                      🔄 Restart
                    </button>
                  )}
                </div>
              </div>
              {remainingSuggestions.length > 0 ? (
                <div className="suggestions-list">
                  {remainingSuggestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggestion-button"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="suggestions-completed">
                  <p>✅ You've explored all the main topics! Feel free to ask any other questions or restart the conversation.</p>
                </div>
              )}
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
              placeholder="Please use the suggested questions above for now..."
              rows={1}
              disabled={true}
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={true}
              className="send-button"
              style={{ opacity: 0.4, cursor: 'not-allowed' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
          <div className="input-disabled-note">
            <p>💡 Use the suggested questions above to explore Prasad's background. Full text input will be available once RAG integration is complete.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
