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
        
        <div className="content-container">
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
        </div>

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
              padding-top: 15px;
            }
            
            .main-content {
              flex: 1;
              position: relative;
              background: var(--eerie-black-2);
              border: 1px solid var(--jet);
              border-radius: 20px;
              padding: 30px;
              padding-top: 35px;
              box-shadow: var(--shadow-1);
              margin-bottom: 15px;
            }

            .content-container {
              height: 100%;
              overflow-y: auto;
              padding-top: 10px;
            }
            
            .sidebar {
              margin-top: 5px;
              margin-bottom: 15px;
            }
            
            @media (min-width: 768px) {
              main {
                min-height: calc(100vh - 120px);
                padding-top: 20px;
              }
              
              .main-content {
                padding: 30px;
                padding-top: 40px;
              }
              
              .sidebar {
                margin-top: 0;
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
                height: auto;
                max-height: calc(100vh - 40px);
                margin-top: 20px;
              }
              
              .main-content {
                flex: 1;
                height: calc(100vh - 40px);
                overflow: hidden;
                margin-top: 20px;
                display: flex;
                flex-direction: column;
              }

              .content-container {
                flex: 1;
                overflow-y: auto;
                padding-right: 5px;
              }
            }
          `}
        </style>
      </div>
    </main>
  );
};

export default Main; 