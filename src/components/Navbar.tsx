import React from 'react';
import getLabel from '../utils/labelUtils';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const handleNavClick = (page: string) => {
    setActivePage(page);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button 
            className={`navbar-link ${activePage === 'about' ? 'active' : ''}`} 
            onClick={() => handleNavClick('about')}
          >
            <img src="/assets/images/icons/person-outline.svg" alt="About" className="nav-icon" />
            {getLabel('navbar.about')}
          </button>
        </li>

        <li className="navbar-item">
          <button 
            className={`navbar-link ${activePage === 'resume' ? 'active' : ''}`} 
            onClick={() => handleNavClick('resume')}
          >
            <img src="/assets/images/icons/document-text-outline.svg" alt="Resume" className="nav-icon" />
            {getLabel('navbar.resume')}
          </button>
        </li>

        {/* Add more navigation items as needed */}
      </ul>
      
      <style>{`
        .navbar {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          border-radius: 0 20px;
          overflow: hidden;
          background: var(--eerie-black-1);
          box-shadow: var(--shadow-2);
          z-index: 100;
          border: 1px solid var(--jet);
          transform: translate(10px, -10px);
        }
        
        .navbar-list {
          display: flex;
          margin: 0;
          padding: 0;
        }
        
        .navbar-item {
          list-style: none;
        }
        
        .navbar-item:not(:last-child) {
          border-right: 1px solid var(--jet);
        }
        
        .navbar-link {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white-1);
          font-weight: var(--fw-500);
          padding: 14px 22px;
          transition: all var(--transition-1);
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 15px;
          letter-spacing: 0.5px;
        }
        
        .nav-icon {
          width: 18px;
          height: 18px;
          margin-right: 8px;
          filter: brightness(1.5);
          transition: all var(--transition-1);
        }
        
        .navbar-link:hover {
          color: var(--orange-yellow-crayola);
        }
        
        .navbar-link:hover .nav-icon,
        .navbar-link.active .nav-icon {
          filter: invert(79%) sepia(53%) saturate(1095%) hue-rotate(334deg) brightness(101%) contrast(96%);
        }
        
        .navbar-link.active {
          color: var(--orange-yellow-crayola);
          font-weight: var(--fw-600);
          position: relative;
        }
        
        .navbar-link.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--orange-yellow-crayola);
        }
        
        @media (min-width: 580px) {
          .navbar {
            transform: translate(8px, -8px);
          }
          
          .navbar-link {
            padding: 16px 26px;
            font-size: 16px;
          }
          
          .nav-icon {
            width: 20px;
            height: 20px;
          }
        }
        
        /* Light theme adjustments */
        [data-theme="light"] .navbar {
          background: var(--onyx);
          border-color: var(--light-gray);
        }
        
        [data-theme="light"] .navbar-item:not(:last-child) {
          border-right: 1px solid var(--light-gray-70);
        }
        
        [data-theme="light"] .navbar-link {
          color: var(--white-2);
        }
        
        [data-theme="light"] .navbar-link .nav-icon {
          filter: brightness(0.3);
        }
        
        [data-theme="light"] .navbar-link:hover .nav-icon,
        [data-theme="light"] .navbar-link.active .nav-icon {
          filter: invert(30%) sepia(80%) saturate(1500%) hue-rotate(340deg) brightness(80%) contrast(90%);
        }
        
        [data-theme="light"] .navbar-link:hover,
        [data-theme="light"] .navbar-link.active {
          color: var(--orange-yellow-crayola);
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 