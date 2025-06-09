import React, { useState } from 'react';
import { Portfolio } from '../types';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import About from './About';
import Resume from './Resume';

interface MainProps {
  portfolio: Portfolio;
}

const Main: React.FC<MainProps> = ({ portfolio }) => {
  const [activePage, setActivePage] = useState('about');

  return (
    <main>
      <Sidebar personalInfo={portfolio.personalInfo} />
      
      <div className="main-content">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        
        <About 
          personalInfo={portfolio.personalInfo} 
          services={portfolio.services}
          technologies={portfolio.technologies}
          expertiseAreas={portfolio.expertiseAreas}
        />
        
        <Resume 
          skills={portfolio.skills} 
          resume={portfolio.resume}
        />

        <style>
          {`
            article { display: none; }
            article.active { display: block; }
            .about.active { display: ${activePage === 'about' ? 'block' : 'none'}; }
            .resume.active { display: ${activePage === 'resume' ? 'block' : 'none'}; }
            
            main {
              display: flex;
              flex-direction: column;
              min-height: calc(100vh - 90px);
              position: relative;
            }
            
            .main-content {
              flex: 1;
              position: relative;
              background: var(--eerie-black-2);
              border: 1px solid var(--jet);
              border-radius: 20px;
              padding: 20px;
              box-shadow: var(--shadow-1);
              margin-bottom: 15px;
            }
            
            article {
              overflow-y: auto;
              padding-top: 15px;
            }
            
            @media (min-width: 768px) {
              main {
                min-height: calc(100vh - 120px);
              }
              
              .main-content {
                padding: 30px;
              }
              
              article {
                padding-top: 20px;
              }
            }
            
            @media (min-width: 1024px) {
              main {
                flex-direction: row;
                gap: 25px;
              }
              
              .sidebar {
                flex: 0 0 350px;
                position: sticky;
                top: 20px;
                height: calc(100vh - 40px);
              }
              
              .main-content {
                flex: 1;
                height: calc(100vh - 40px);
                overflow-y: auto;
                margin-top: 20px;
              }
              
              article {
                padding-top: 10px;
              }
            }
          `}
        </style>
      </div>
    </main>
  );
};

export default Main; 