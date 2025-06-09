import React, { useState } from 'react';
import { PersonalInfo, Service, Technology, ExpertiseArea } from '../types';
import getLabel from '../utils/labelUtils';

interface AboutProps {
  personalInfo: PersonalInfo;
  services: Service[];
  technologies: Technology[];
  expertiseAreas: ExpertiseArea[];
}

const About: React.FC<AboutProps> = ({ personalInfo, services, technologies, expertiseAreas }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveTooltip(id);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">{getLabel('about.title')}</h2>
      </header>

      <section className="about-text">
        {personalInfo.aboutMe.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      {/* Services Section */}
      <section className="service">
        <div className="title-wrapper">
          <div className="icon-box">
            <span className="icon">
              <img src="/assets/images/icons/build-outline.svg" alt="Services icon" />
            </span>
          </div>
          <h3 className="h3 service-title">{getLabel('about.whatImDoing')}</h3>
        </div>

        <ul className="service-list">
          {services.map((service, index) => (
            <li className="service-item" key={index}>
              <div className="service-icon-box">
                <img src={service.icon} alt={`${service.title} icon`} width="40" />
              </div>

              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Areas of Expertise Section */}
      <section className="expertise-section">
        <div className="title-wrapper">
          <div className="icon-box">
            <span className="icon">
              <img src="/assets/images/icons/ribbon-outline.svg" alt="Expertise icon" />
            </span>
          </div>
          <h3 className="h3 service-title">{getLabel('about.areasOfExpertise')}</h3>
        </div>
        
        <div className="expertise-list">
          {expertiseAreas.map((area, index) => {
            const tooltipId = `expertise-${index}`;
            // Check if the area is Platform Engineering
            if (area.name === "Platform Engineering" || area.name === "PLM Architecture") {
              return (
                <div 
                  className="expertise-item with-icon tooltip-container" 
                  key={index}
                  onMouseEnter={() => handleMouseEnter(tooltipId)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img 
                    src="/assets/images/platform-engineering.svg" 
                    className="icon-platform-engineering" 
                    alt="Platform Engineering icon" 
                  />
                  <span>{area.name}</span>
                  {activeTooltip === tooltipId && area.achievement && (
                    <div className="tooltip-content">
                      {area.achievement}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <div 
                className="expertise-item tooltip-container" 
                key={index}
                onMouseEnter={() => handleMouseEnter(tooltipId)}
                onMouseLeave={handleMouseLeave}
              >
                <span>{area.name}</span>
                {activeTooltip === tooltipId && area.achievement && (
                  <div className="tooltip-content">
                    {area.achievement}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Technologies Section */}
      <section className="technologies">
        <div className="title-wrapper">
          <div className="icon-box">
            <span className="icon">
              <img src="/assets/images/icons/code-slash-outline.svg" alt="Technologies icon" />
            </span>
          </div>
          <h3 className="h3 technologies-title">{getLabel('about.technologies')}</h3>
        </div>
        
        <div className="technologies-icons">
          {technologies.map((tech, index) => {
            const tooltipId = `tech-${index}`;
            // Check if the tech is DevOps
            if (tech.name === "DevOps") {
              return (
                <div 
                  className="tech-item with-icon tooltip-container" 
                  key={index}
                  onMouseEnter={() => handleMouseEnter(tooltipId)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img 
                    src="/assets/images/devops.svg" 
                    className="icon-devops" 
                    alt="DevOps icon" 
                  />
                  <span>{tech.name}</span>
                  {activeTooltip === tooltipId && tech.achievement && (
                    <div className="tooltip-content">
                      {tech.achievement}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <div 
                className="tech-item tooltip-container" 
                key={index}
                onMouseEnter={() => handleMouseEnter(tooltipId)}
                onMouseLeave={handleMouseLeave}
              >
                <img src={tech.icon} alt={tech.name} title={tech.title || tech.name} />
                <span>{tech.name}</span>
                {activeTooltip === tooltipId && tech.achievement && (
                  <div className="tooltip-content">
                    {tech.achievement}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        .about {
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 0;
          overflow: visible;
        }
        
        .article-title {
          margin-bottom: 20px;
        }
        
        /* Tooltip styling */
        .tooltip-container {
          position: relative;
          cursor: pointer;
        }
        
        .tooltip-content {
          position: absolute;
          bottom: calc(100% + 15px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--eerie-black-1);
          color: var(--white-2);
          padding: 12px 15px;
          border-radius: 8px;
          font-size: var(--fs-7);
          width: max-content;
          max-width: 250px;
          box-shadow: var(--shadow-2);
          border: 1px solid var(--jet);
          z-index: 100;
          line-height: 1.5;
          text-align: left;
          white-space: normal;
        }
        
        .tooltip-content::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 10px 8px 0;
          border-style: solid;
          border-color: var(--eerie-black-1) transparent transparent transparent;
        }
        
        /* Light theme tooltip adjustments */
        [data-theme="light"] .tooltip-content {
          background: hsl(0, 0%, 95%);
          color: hsl(0, 0%, 5%);
          border-color: hsl(0, 0%, 80%);
        }
        
        [data-theme="light"] .tooltip-content::after {
          border-color: hsl(0, 0%, 95%) transparent transparent transparent;
        }
      `}</style>
    </article>
  );
};

export default About; 