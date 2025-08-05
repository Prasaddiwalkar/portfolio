import React, { useState, useEffect } from 'react';
import { Portfolio } from '../types';
import { Sidebar, AIChat } from '../components';
import { useAIChat } from '../hooks';
import { NAVIGATION_PAGES, AI_AGENT_STATUS, type NavigationPage } from '../constants';
import About from './About';
import Resume from './Resume';
import { aiService } from '../services/aiService';
import { getStaticResponse } from '../services/staticChatService';
import getLabel from '../utils/labelUtils';
import '../styles/components/ui/AIChat.css';
import '../styles/components/pages/Main.css';

interface MainProps {
  portfolio: Portfolio;
}

const Main: React.FC<MainProps> = ({ portfolio }) => {
  const [activePage, setActivePage] = useState<NavigationPage>(NAVIGATION_PAGES.ABOUT);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { aiAgentStatus, updateAIStatus } = useAIChat();

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    // Initialize AI service with portfolio data
    const initializeAI = async () => {
      try {
        updateAIStatus(AI_AGENT_STATUS.CHECKING);
        
        // For now, always use static responses until RAG is implemented
        // TODO: Replace this with actual AI service when RAG is ready
        updateAIStatus(AI_AGENT_STATUS.DISCONNECTED);
        
        // Uncomment below when RAG is implemented:
        /*
        const isHealthy = await aiService.healthCheck();
        
        if (isHealthy) {
          await aiService.initialize(portfolio);
          updateAIStatus(AI_AGENT_STATUS.CONNECTED);
        } else {
          updateAIStatus(AI_AGENT_STATUS.DISCONNECTED);
        }
        */
      } catch (error) {
        console.error('Failed to initialize AI service:', error);
        updateAIStatus(AI_AGENT_STATUS.DISCONNECTED);
      }
    };
    
    initializeAI();
  }, [portfolio, updateAIStatus]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleAIMessage = async (message: string): Promise<string> => {
    try {
      // If AI service is connected, use it
      if (aiAgentStatus === AI_AGENT_STATUS.CONNECTED) {
        return await aiService.sendMessage(message, portfolio);
      } else {
        // Otherwise, use static responses
        return getStaticResponse(message);
      }
    } catch (error) {
      console.error('AI message error:', error);
      // Fallback to static responses if AI service fails
      return getStaticResponse(message);
    }
  };

  return (
    <main>
      <div className="container">
        <Sidebar personalInfo={portfolio.personalInfo} />
        
        <div className="main-content">
          {/* Custom Tab Navigation */}
          <div className="custom-tabs">
            {/* Theme Toggle moved to left corner */}
            <button 
              className="theme-toggle" 
              title={isDarkMode ? getLabel('sidebar.themeDark') : getLabel('sidebar.themeLight')}
              onClick={toggleTheme}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <div className="tab-buttons">
              <button 
                className={`tab-button ${activePage === 'about' ? 'active' : ''}`}
                onClick={() => setActivePage('about')}
              >
                <img src="/assets/images/icons/person-outline.svg" alt="About" className="tab-icon" />
                <span>About</span>
              </button>
              <button 
                className={`tab-button ${activePage === NAVIGATION_PAGES.RESUME ? 'active' : ''}`}
                onClick={() => setActivePage(NAVIGATION_PAGES.RESUME)}
              >
                <img src="/assets/images/icons/document-text-outline.svg" alt="Resume" className="tab-icon" />
                <span>Resume</span>
              </button>
            </div>
          </div>
          
          <div className="content-container">
            {activePage === 'about' && (
              <About 
                personalInfo={portfolio.personalInfo} 
                services={portfolio.services}
                technologies={portfolio.technologies}
                expertiseAreas={portfolio.expertiseAreas}
              />
            )}
            
            {activePage === NAVIGATION_PAGES.RESUME && (
              <Resume 
                skills={portfolio.skills} 
                resume={portfolio.resume}
              />
            )}
          </div>
        </div>
      </div>

      {/* AI Chat Toggle Button */}
      <button 
        className={`ai-chat-toggle ${isChatOpen ? 'active' : ''} ${aiAgentStatus}`}
        onClick={toggleChat}
        title={
          aiAgentStatus === AI_AGENT_STATUS.CONNECTED 
            ? "Chat with AI Assistant" 
            : aiAgentStatus === AI_AGENT_STATUS.CHECKING
            ? "Connecting to AI Assistant..."
            : "Chat with AI Assistant (Static Responses)"
        }
        disabled={aiAgentStatus === AI_AGENT_STATUS.CHECKING}
      >
        {isChatOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : aiAgentStatus === AI_AGENT_STATUS.CHECKING ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="spin">
            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
          </svg>
        ) : aiAgentStatus === AI_AGENT_STATUS.CONNECTED ? (
          <img 
            src="/assets/images/BotAvatar.png" 
            alt="AI Assistant Connected" 
            width="32" 
            height="32" 
            className="ai-agent-connected"
            style={{ 
              background: 'linear-gradient(135deg, #ffd700, #ffed4e, #fff59d)',
              filter: 'brightness(1.3) contrast(1.2)',
              borderRadius: '6px',
              padding: '2px'
            }}
          />
        ) : (
          <img 
            src="/assets/images/BotAvatar.png" 
            alt="AI Assistant Disconnected" 
            width="32" 
            height="32" 
            className="ai-agent-disconnected bg-gradient-yellow"
            style={{ 
              background: 'linear-gradient(135deg, #5a4a0f, #6b5b13, #8b6914)',
              borderRadius: '6px',
              padding: '2px'
            }}
          />
        )}
      </button>

      {/* AI Chat Component */}
      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        onSendMessage={handleAIMessage}
      />
    </main>
  );
};

export default Main; 