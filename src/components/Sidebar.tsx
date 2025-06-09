import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '../types';
import getLabel from '../utils/labelUtils';

interface SidebarProps {
  personalInfo: PersonalInfo;
}

const Sidebar: React.FC<SidebarProps> = ({ personalInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={personalInfo.avatar} alt={personalInfo.name} width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title={personalInfo.name}>{personalInfo.name}</h1>
          <p className="title">{personalInfo.title}</p>
        </div>

        <button 
          className="info_more-btn" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{isOpen ? getLabel('sidebar.showLess') : getLabel('sidebar.showMore')}</span>
          <span className="icon">
            <img 
              src={isOpen ? "/assets/images/icons/chevron-up.svg" : "/assets/images/icons/chevron-down.svg"} 
              alt="toggle icon" 
            />
          </span>
        </button>

        <button 
          className="theme-btn" 
          title={isDarkMode ? getLabel('sidebar.themeDark') : getLabel('sidebar.themeLight')}
          onClick={toggleTheme}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          {personalInfo.contacts.map((contact, index) => (
            <li className="contact-item" key={index}>
              <div className="icon-box">
                <img src={contact.icon} alt={contact.titleKey ? getLabel(contact.titleKey) : ''} width="16" />
              </div>

              <div className="contact-info">
                <p className="contact-title">{contact.titleKey ? getLabel(contact.titleKey) : ''}</p>

                {contact.link ? (
                  <a 
                    href={contact.link} 
                    className="contact-link"
                    {...(contact.valueKey === 'contacts.downloadCV' ? { 
                      download: "Prasad_Deshpande_CV.pdf", 
                      target: "_blank", 
                      rel: "noopener noreferrer" 
                    } : {})}
                  >
                    {contact.valueKey ? getLabel(contact.valueKey) : contact.value}
                  </a>
                ) : (
                  <p className="contact-value">{contact.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          {personalInfo.socials.map((social, index) => (
            <li className="social-item" key={index}>
              <a href={social.url} className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={social.icon} alt={social.platform} width="16" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style>
        {`
          .contact-value {
            color: var(--white-2);
            font-size: var(--fs-7);
            font-style: normal;
          }
        `}
      </style>
    </aside>
  );
};

export default Sidebar; 