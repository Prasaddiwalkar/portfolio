import React from 'react';
import { Education, Experience, Skill } from '../types';
import getLabel from '../utils/labelUtils';

interface ResumeProps {
  skills: {
    technical: Skill[];
    soft: Skill[];
  };
  resume: {
    education: Education[];
    experience: Experience[];
  };
}

const Resume: React.FC<ResumeProps> = ({ skills, resume }) => {
  return (
    <article className="resume active" data-page="resume">
      <header>
        <h2 className="h2 article-title">{getLabel('resume.title')}</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <span className="icon">
              <img src="/assets/images/icons/book-outline.svg" alt="Education icon" />
            </span>
          </div>
          <h3 className="h3">{getLabel('resume.education')}</h3>
        </div>

        <ol className="timeline-list">
          {resume.education.map((edu, index) => (
            <li className="timeline-item" key={index}>
              <h4 className="h4 timeline-item-title">{edu.degree}</h4>
              <span>{edu.institution}</span>
              <span className="timeline-text">{edu.description}</span>
              <span className="timeline-date">{edu.timeframe}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <span className="icon">
              <img src="/assets/images/icons/briefcase-outline.svg" alt="Experience icon" />
            </span>
          </div>
          <h3 className="h3">{getLabel('resume.experience')}</h3>
        </div>

        <ol className="timeline-list">
          {resume.experience.map((exp, index) => (
            <li className="timeline-item" key={index}>
              <h4 className="h4 timeline-item-title">{exp.position}</h4>
              <span>{exp.company}</span>
              <span className="timeline-text">{exp.description}</span>
              <span className="timeline-date">{exp.timeframe}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="skill">
        <div className="title-wrapper">
          <div className="icon-box">
            <span className="icon">
              <img src="/assets/images/icons/hardware-chip-outline.svg" alt="Technical skills icon" />
            </span>
          </div>
          <h3 className="h3 skills-title">{getLabel('resume.technicalSkills')}</h3>
        </div>
        
        <ul className="skills-list content-card">
          {skills.technical.map((skill, index) => (
            <li className="skills-item" key={index}>
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <data value={skill.level}>{skill.level}%</data>
              </div>
              <div className="skill-progress-bg">
                <div 
                  className="skill-progress-fill" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="skill">
        <div className="title-wrapper">
          <div className="icon-box">
            <span className="icon">
              <img src="/assets/images/icons/people-outline.svg" alt="Soft skills icon" />
            </span>
          </div>
          <h3 className="h3 skills-title">{getLabel('resume.softSkills')}</h3>
        </div>
        
        <ul className="skills-list content-card">
          {skills.soft.map((skill, index) => (
            <li className="skills-item" key={index}>
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <data value={skill.level}>{skill.level}%</data>
              </div>
              <div className="skill-progress-bg">
                <div 
                  className="skill-progress-fill" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <style>{`
        .resume {
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
        
        .timeline-list {
          margin-left: 20px;
          position: relative;
        }
        
        .timeline-list::before {
          content: '';
          position: absolute;
          top: 0;
          left: -10px;
          width: 2px;
          height: 100%;
          background-color: var(--border-visible);
        }
        
        .timeline-item {
          position: relative;
          padding-bottom: 30px;
          padding-left: 25px;
        }
        
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          top: 4px;
          left: -14px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--primary-accent);
          z-index: 1;
        }
        
        .timeline-item-title {
          color: var(--text-primary);
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .timeline-text {
          display: block;
          color: var(--text-secondary);
          margin: 10px 0;
          line-height: 1.6;
        }
        
        .timeline-date {
          color: var(--primary-accent);
          font-size: 0.9rem;
          font-weight: 500;
          display: block;
          margin-top: 8px;
        }
        
        .skills-list {
          padding: 0;
        }
        
        .skills-item:not(:last-child) {
          margin-bottom: 20px;
        }
        
        .skills-item .title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          margin-top: 0;
        }
        
        .skills-item .h5 {
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 500;
        }
        
        .skills-item data {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .skill-progress-bg {
          background-color: var(--bg-secondary);
          height: 8px;
          border-radius: 4px;
          border: 1px solid var(--border-visible);
        }
        
        .skill-progress-fill {
          background-color: var(--primary-accent);
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease-in-out;
        }
        
        @media (min-width: 768px) {
          .timeline-item-title {
            font-size: 1.3rem;
          }
          
          .skills-item .h5 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </article>
  );
};

export default Resume; 