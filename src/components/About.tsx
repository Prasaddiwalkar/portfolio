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
          border: none !important;
          border-radius: 0;
          box-shadow: none;
          padding: 0;
          overflow: visible;
        }
        
        .article-title {
          margin-bottom: 20px;
        }
        
        .about-text p {
          margin-bottom: 15px;
          line-height: 1.6;
        }
        
        .title-wrapper {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          margin-top: 30px;
        }
        
        .icon-box {
          background: var(--bg-secondary);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }
        
        .icon-box img {
          width: 24px;
          height: 24px;
        }
        
        .service-title, .technologies-title {
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .service-item {
          padding: 20px;
          border-radius: 15px;
          background: var(--bg-secondary);
          margin-bottom: 20px;
          border: 1px solid var(--border-visible);
        }
        
        .service-icon-box {
          margin-bottom: 15px;
        }
        
        .service-item-title {
          margin-bottom: 10px;
          font-size: 1.2rem;
          color: var(--text-primary);
        }
        
        .service-item-text {
          line-height: 1.6;
        }
        
        .expertise-list {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .expertise-item {
          background: var(--bg-secondary);
          padding: 10px 15px;
          border-radius: 30px;
          display: inline-flex;
          align-items: center;
          color: var(--text-primary);
          font-size: 0.9rem;
          border: 1px solid var(--border-visible);
        }
        
        .expertise-item.with-icon {
          padding-left: 10px;
        }
        
        .expertise-item img {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        
        .technologies-icons {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 20px;
        }
        
        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
        }
        
        .tech-item img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        
        .tech-item span {
          font-size: 0.85rem;
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
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 12px 15px;
          border-radius: 8px;
          font-size: var(--fs-7);
          width: max-content;
          max-width: 250px;
          box-shadow: var(--shadow-2);
          border: 1px solid var(--border-visible);
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
          border-color: var(--bg-secondary) transparent transparent transparent;
        }
        
        @media (min-width: 768px) {
          .technologies-icons {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }
          
          .service-title, .technologies-title {
            font-size: 1.7rem;
          }
          
          .service-item-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </article>
  );
};

export default About; 