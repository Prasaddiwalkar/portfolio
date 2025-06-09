import React, { useState, useEffect } from 'react';
import { Portfolio } from '../types';
import Sidebar from './Sidebar';
import About from './About';
import Resume from './Resume';
import getLabel from '../utils/labelUtils';

interface MainProps {
  portfolio: Portfolio;
}

const Main: React.FC<MainProps> = ({ portfolio }) => {
  const [activePage, setActivePage] = useState('about');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
                className={`tab-button ${activePage === 'resume' ? 'active' : ''}`}
                onClick={() => setActivePage('resume')}
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
            
            {activePage === 'resume' && (
              <Resume 
                skills={portfolio.skills} 
                resume={portfolio.resume}
              />
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          /* Common styles for both light and dark modes */
          :root {
            --primary-accent: var(--orange-yellow-crayola);
            --text-primary: var(--white-1);
            --text-secondary: var(--white-2);
            --bg-primary: var(--eerie-black-2);
            --bg-secondary: var(--eerie-black-1);
            --border-color: var(--jet);
            --border-visible: rgba(255, 255, 255, 0.1);
          }
          
          /* Light mode overrides */
          [data-theme="light"] {
            --primary-accent: #ff9800; /* slightly darker orange for better contrast */
            --text-primary: #333333;
            --text-secondary: #555555;
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --border-color: #dddddd;
            --border-visible: rgba(0, 0, 0, 0.1);
          }
          
          main {
            display: flex;
            flex-direction: column;
            padding: 20px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
            background-color: var(--bg-secondary);
            min-height: 100vh;
          }
          
          .container {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            gap: 20px;
          }
          
          .main-content {
            background: var(--bg-primary);
            border: 1px solid var(--border-visible);
            border-radius: 15px;
            padding: 15px 15px 30px 15px;
            box-shadow: var(--shadow-1);
            margin-bottom: 15px;
            width: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            max-width: 800px; /* LinkedIn-style content width */
            align-self: center;
          }
          
          /* Theme toggle button */
          .theme-toggle {
            position: relative;
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border-visible);
            border-radius: 4px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
            font-size: 20px;
          }
          
          .theme-toggle:hover {
            background-color: var(--primary-accent);
            color: var(--bg-primary);
          }
          
          /* Custom Tab Navigation */
          .custom-tabs {
            position: relative;
            width: 100%;
            margin-bottom: 25px;
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .tab-buttons {
            display: flex;
            gap: 10px;
            padding: 0;
          }
          
          .tab-button {
            background-color: transparent;
            color: var(--text-secondary);
            border: none;
            padding: 8px 15px;
            border-radius: 0;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .tab-icon {
            width: 18px;
            height: 18px;
            object-fit: contain;
          }
          
          /* Default icon color for both modes */
          .tab-icon {
            filter: brightness(0) saturate(100%) invert(80%) sepia(10%) saturate(368%) hue-rotate(179deg) brightness(88%) contrast(85%);
          }
          
          [data-theme="light"] .tab-icon {
            filter: brightness(0) saturate(100%) invert(20%) sepia(10%) saturate(368%) hue-rotate(179deg) brightness(95%) contrast(85%);
          }
          
          .tab-button.active {
            color: var(--primary-accent);
            font-weight: 600;
          }
          
          .tab-button.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: var(--primary-accent);
            border-radius: 3px;
          }
          
          /* Make active icons orange-yellow in dark mode */
          .tab-button.active .tab-icon {
            filter: invert(80%) sepia(50%) saturate(1000%) hue-rotate(360deg) brightness(105%) contrast(105%);
          }
          
          /* Light mode icon adjustment */
          [data-theme="light"] .tab-button.active .tab-icon {
            filter: invert(60%) sepia(85%) saturate(1200%) hue-rotate(360deg) brightness(100%) contrast(90%);
          }
          
          .content-container {
            width: 100%;
            height: auto;
            overflow-y: visible;
            padding-top: 10px;
            padding-left: 0;
            padding-right: 0;
            border-top: 0;
            margin-top: 5px;
            border: none;
          }
          
          /* Make article content fill container */
          .about, .resume {
            width: 100%;
            display: block;
            border: none;
          }
          
          /* Better typography for mobile */
          .article-title {
            font-size: 1.8rem;
            margin-bottom: 20px;
            margin-top: 10px;
            color: var(--text-primary);
            position: relative;
          }
          
          .article-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 40px;
            height: 4px;
            background-color: var(--primary-accent);
            border-radius: 2px;
          }
          
          /* Consistent heading colors */
          h1, h2, h3, h4, h5, h6 {
            color: var(--text-primary);
          }
          
          /* Consistent text colors */
          p, span, li, a:not(.tab-button) {
            color: var(--text-secondary);
          }
          
          /* Consistent icon colors for services */
          .service-icon-box img,
          .icon-box img,
          .tech-item img,
          .expertise-item img {
            filter: brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(1000%) hue-rotate(360deg) brightness(100%) contrast(100%);
          }
          
          [data-theme="light"] .service-icon-box img,
          [data-theme="light"] .icon-box img,
          [data-theme="light"] .tech-item img,
          [data-theme="light"] .expertise-item img {
            filter: brightness(0) saturate(100%) invert(60%) sepia(85%) saturate(1200%) hue-rotate(360deg) brightness(100%) contrast(90%);
          }
          
          /* Service items style */
          .service-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .service-item {
            background-color: var(--bg-secondary);
            border-radius: 14px;
            padding: 25px;
            box-shadow: var(--shadow-1);
            transition: all 0.3s ease;
            border: 1px solid var(--border-visible);
          }
          
          /* Tablet (768px and up) */
          @media (min-width: 768px) {
            main {
              padding: 20px;
            }
            
            .main-content {
              padding: 25px 25px 40px 25px;
              border-radius: 18px;
            }
            
            .tab-button {
              padding: 10px 18px;
              font-size: 16px;
            }
            
            .tab-icon {
              width: 20px;
              height: 20px;
            }
            
            .service-list {
              grid-template-columns: 1fr 1fr;
            }
            
            .article-title {
              font-size: 2rem;
            }
            
            .article-title::after {
              width: 50px;
              height: 4px;
            }
          }
          
          /* Desktop (1024px and up) */
          @media (min-width: 1024px) {
            main {
              padding: 20px;
            }
            
            .container {
              flex-direction: row;
              align-items: flex-start;
              padding-top: 0;
              gap: 20px;
            }
            
            .sidebar {
              width: 350px;
              flex-shrink: 0;
              margin: 0;
              padding: 0;
            }
            
            /* Reset padding for sidebar content to align with main content */
            .sidebar .sidebar-info {
              padding-top: 15px;
            }
            
            .main-content {
              flex: 0 1 800px; /* LinkedIn-style width limitation */
              min-height: calc(100vh - 40px);
              padding: 15px 30px 30px 30px;
              border-radius: 20px;
              margin: 0;
            }
            
            .custom-tabs {
              margin-top: 0;
            }
            
            .tab-button {
              padding: 12px 20px;
              font-size: 18px;
            }
            
            .tab-icon {
              width: 22px;
              height: 22px;
            }
            
            .tab-button:hover {
              color: var(--primary-accent);
            }
            
            .tab-button:hover .tab-icon {
              filter: invert(80%) sepia(50%) saturate(1000%) hue-rotate(360deg) brightness(105%) contrast(95%);
              opacity: 0.8;
            }
            
            [data-theme="light"] .tab-button:hover .tab-icon {
              filter: invert(60%) sepia(85%) saturate(1200%) hue-rotate(360deg) brightness(100%) contrast(90%);
              opacity: 0.8;
            }
            
            .service-list {
              grid-template-columns: repeat(2, 1fr);
              gap: 30px;
            }
            
            .service-item:hover {
              transform: translateY(-5px);
              box-shadow: var(--shadow-2);
            }
            
            .article-title {
              font-size: 2.2rem;
              margin-bottom: 30px;
            }
            
            .article-title::after {
              width: 60px;
              height: 5px;
            }
          }
          
          /* Large screens (1440px and up) */
          @media (min-width: 1440px) {
            .container {
              max-width: 1300px;
              gap: 30px;
            }
            
            .service-list {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}
      </style>
    </main>
  );
};

export default Main; 