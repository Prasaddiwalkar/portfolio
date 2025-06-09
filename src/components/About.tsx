import React from 'react';
import { PersonalInfo, Service, Technology, ExpertiseArea } from '../types';
import getLabel from '../utils/labelUtils';

interface AboutProps {
  personalInfo: PersonalInfo;
  services: Service[];
  technologies: Technology[];
  expertiseAreas: ExpertiseArea[];
}

const About: React.FC<AboutProps> = ({ personalInfo, services, technologies, expertiseAreas }) => {
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
            // Check if the area is Platform Engineering
            if (area.name === "Platform Engineering" || area.name === "PLM Architecture") {
              return (
                <div className="expertise-item with-icon" key={index}>
                  <img 
                    src="/assets/images/platform-engineering.svg" 
                    className="icon-platform-engineering" 
                    alt="Platform Engineering icon" 
                  />
                  <span>{area.name}</span>
                </div>
              );
            }
            
            return (
              <div className="expertise-item" key={index}>
                <span>{area.name}</span>
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
            // Check if the tech is DevOps
            if (tech.name === "DevOps") {
              return (
                <div className="tech-item with-icon" key={index}>
                  <img 
                    src="/assets/images/devops.svg" 
                    className="icon-devops" 
                    alt="DevOps icon" 
                  />
                  <span>{tech.name}</span>
                </div>
              );
            }
            
            return (
              <div className="tech-item" key={index}>
                <img src={tech.icon} alt={tech.name} title={tech.title || tech.name} />
                <span>{tech.name}</span>
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
        }
        
        .article-title {
          margin-bottom: 20px;
        }
      `}</style>
    </article>
  );
};

export default About; 