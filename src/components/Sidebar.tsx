import React, { useState, useRef, useEffect } from 'react';
import { PersonalInfo } from '../types';
import getLabel from '../utils/labelUtils';

interface SidebarProps {
  personalInfo: PersonalInfo;
}

const Sidebar: React.FC<SidebarProps> = ({ personalInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (sidebarRef.current && contentRef.current) {
        const sidebarHeight = sidebarRef.current.clientHeight;
        const contentHeight = contentRef.current.scrollHeight;
        setShowButton(contentHeight > sidebarHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <aside className={`sidebar ${isOpen ? 'active' : ''}`} ref={sidebarRef}>
      <div className="sidebar-content" ref={contentRef}>
        <div className="sidebar-info">
          <figure className="avatar-box">
            <img src={personalInfo.avatar} alt={personalInfo.name} width="80" />
          </figure>

          <div className="info-content">
            <h1 className="name" title={personalInfo.name}>{personalInfo.name}</h1>
            <p className="title">{personalInfo.title}</p>
          </div>

          {showButton && (
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
          )}
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
      </div>

      <style>
        {`
          .contact-value {
            color: var(--text-secondary);
            font-size: var(--fs-7);
            font-style: normal;
          }
          
          .sidebar {
            padding: 0;
            max-height: none;
            position: relative;
            background-color: var(--bg-primary);
            border: 1px solid var(--border-visible);
            border-radius: 15px;
            box-shadow: var(--shadow-1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .sidebar.active {
            overflow-y: auto;
            max-height: none;
          }
          
          .sidebar-content {
            display: flex;
            flex-direction: column;
          }
          
          .sidebar-info {
            padding: 20px;
            gap: 15px;
            position: relative;
          }
          
          .avatar-box {
            position: relative;
            z-index: 1;
            margin-bottom: 15px;
          }
          
          .avatar-box img {
            width: 80px;
            border-radius: 15px;
            border: 2px solid var(--border-visible);
          }
          
          .info-content .name {
            margin-bottom: 10px;
            font-size: 1.5rem;
            color: var(--text-primary);
          }
          
          .info-content .title {
            color: var(--text-secondary);
            font-size: 1rem;
          }
          
          .sidebar-info_more {
            padding: 0 20px 20px;
          }
          
          .contacts-list {
            margin-top: 15px;
            margin-bottom: 15px;
            gap: 18px;
          }
          
          .contact-item {
            margin-bottom: 10px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
          }
          
          .separator {
            margin: 15px 0;
            height: 1px;
            background-color: var(--border-visible);
          }
          
          /* Fix for extra space at bottom */
          .social-list {
            margin-bottom: 0;
            padding-bottom: 0;
            display: flex;
            gap: 10px;
          }
          
          /* Show/hide button styling */
          .info_more-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            background: transparent;
            padding: 8px 12px;
            border: 1px solid var(--border-visible);
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .info_more-btn:hover {
            color: var(--primary-accent);
          }
          
          .info_more-btn .icon img {
            width: 18px;
            height: 18px;
            filter: brightness(0) saturate(100%) invert(80%) sepia(10%) saturate(368%) hue-rotate(179deg) brightness(88%) contrast(85%);
          }
          
          [data-theme="light"] .info_more-btn .icon img {
            filter: brightness(0) saturate(100%) invert(20%) sepia(10%) saturate(368%) hue-rotate(179deg) brightness(95%) contrast(85%);
          }
          
          @media (max-width: 767px) {
            .sidebar {
              margin-bottom: 20px;
            }
          }
          
          @media (min-width: 768px) {
            .avatar-box img {
              width: 100px;
            }
            
            .sidebar-info {
              gap: 20px;
            }
            
            .contacts-list {
              gap: 20px;
            }
            
            .info_more-btn {
              font-size: 15px;
            }
          }
          
          @media (min-width: 1024px) {
            .sidebar {
              height: calc(100vh - 40px);
              max-height: calc(100vh - 40px);
              overflow-y: auto;
              position: sticky;
              top: 20px;
              padding: 0;
            }
            
            .sidebar-info {
              padding: 15px 20px 20px 20px;
            }
          }
          
          /* Fix for large screens */
          @media (min-width: 1250px) {
            .social-list {
              margin-bottom: 0;
              padding-bottom: 0;
            }
          }
        `}
      </style>
    </aside>
  );
};

export default Sidebar; 