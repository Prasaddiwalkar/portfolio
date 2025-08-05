import React from 'react';
import { Education, Experience, Skill } from '../types';
import getLabel from '../utils/labelUtils';
import '../styles/components/pages/Resume.css';

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
    </article>
  );
};

export default Resume; 