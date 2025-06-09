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
    <aside className={`sidebar ${isOpen ? 'active' : ''} has-scrollbar`}>
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
          
          .sidebar {
            padding: 20px;
            max-height: 120px;
          }
          
          .sidebar.active {
            overflow-y: auto;
            max-height: fit-content;
            padding-bottom: 0;
          }
          
          .sidebar-info {
            gap: 15px;
          }
          
          .avatar-box img {
            width: 80px;
          }
          
          .info-content .name {
            margin-bottom: 10px;
          }
          
          .contacts-list {
            margin-top: 15px;
            margin-bottom: 15px;
            gap: 18px;
          }
          
          .contact-item {
            margin-bottom: 5px;
          }
          
          .separator {
            margin: 15px 0;
          }
          
          /* Fix for extra space at bottom */
          .social-list {
            margin-bottom: 0;
            padding-bottom: 0;
          }
          
          @media (max-width: 767px) {
            .sidebar {
              min-height: 120px;
            }
            
            .sidebar.active {
              max-height: auto;
              overflow-y: auto;
              padding-bottom: 0;
            }
            
            .contacts-list {
              gap: 15px;
            }
          }
          
          @media (min-width: 768px) {
            .sidebar {
              padding: 25px;
              max-height: 140px;
            }
            
            .avatar-box img {
              width: 100px;
            }
            
            .sidebar-info {
              gap: 20px;
            }
            
            .contacts-list {
              gap: 20px;
            }
          }
          
          @media (min-width: 1024px) {
            .sidebar {
              padding: 30px;
              height: auto;
              max-height: calc(100vh - 40px);
              overflow-y: auto;
              padding-bottom: 20px;
            }
          }
          
          /* Fix for large screens */
          @media (min-width: 1250px) {
            .sidebar {
              position: sticky;
              top: 60px;
              width: 20%;
              height: auto;
              padding-bottom: 0;
            }
            
            .social-list {
              margin-bottom: 0;
              padding-bottom: 0;
            }
            
            .sidebar-info_more {
              padding-bottom: 0;
            }
          }
        `}
      </style>
    </aside>
  );
};

export default Sidebar; 