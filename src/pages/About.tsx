import React, { useState } from 'react';
import { PersonalInfo, Service, Technology, ExpertiseArea } from '../types';
import getLabel from '../utils/labelUtils';
import '../styles/components/pages/About.css';

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
            // Check if the area has an icon
            if (area.icon) {
              return (
                <div 
                  className="expertise-item with-icon tooltip-container" 
                  key={index}
                  onMouseEnter={() => handleMouseEnter(tooltipId)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img 
                    src={area.icon} 
                    className="icon-platform-engineering" 
                    alt={`${area.name} icon`} 
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
            
            return (
              <div 
                className="tech-item tooltip-container" 
                key={index}
                onMouseEnter={() => handleMouseEnter(tooltipId)}
                onMouseLeave={handleMouseLeave}
              >
                {/* <img src={tech.icon} alt={tech.name} title={tech.title || tech.name} /> */}
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
    </article>
  );
};

export default About; 