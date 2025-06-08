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
            }
            
            .main-content {
              flex: 1;
              padding: 15px 0;
              display: flex;
              flex-direction: column;
            }
            
            article {
              flex: 1;
              overflow-y: auto;
              max-height: calc(100vh - 240px);
            }
            
            @media (min-width: 768px) {
              main {
                min-height: calc(100vh - 120px);
              }
              
              .main-content {
                padding: 20px 0;
              }
              
              article {
                max-height: calc(100vh - 280px);
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
                padding: 25px 0;
              }
              
              article {
                max-height: none;
              }
            }
          `}
        </style>
      </div>
    </main>
  );
};

export default Main; 