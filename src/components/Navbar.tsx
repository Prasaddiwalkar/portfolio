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
          top: -20px;
          right: -20px;
          display: flex;
          border-radius: 0 20px;
          overflow: hidden;
          background: linear-gradient(145deg, var(--eerie-black-1), var(--smoky-black));
          box-shadow: var(--shadow-3);
          z-index: 10;
          border: 2px solid var(--jet);
          margin-bottom: 30px;
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
          border-right: 2px solid var(--jet);
        }
        
        .navbar-link {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white-1);
          font-weight: var(--fw-600);
          padding: 16px 30px;
          transition: all var(--transition-1);
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: var(--fs-4);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          gap: 10px;
        }
        
        .nav-icon {
          width: 22px;
          height: 22px;
          filter: brightness(1.8);
          transition: all var(--transition-1);
        }
        
        .navbar-link:hover .nav-icon,
        .navbar-link.active .nav-icon {
          filter: invert(79%) sepia(53%) saturate(1095%) hue-rotate(334deg) brightness(101%) contrast(96%);
          transform: scale(1.1);
        }
        
        .navbar-link:hover {
          color: var(--orange-yellow-crayola);
          background-color: rgba(0, 0, 0, 0.3);
        }
        
        .navbar-link.active {
          color: var(--orange-yellow-crayola);
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
          box-shadow: inset 0 -4px 0 var(--orange-yellow-crayola);
        }
        
        @media (min-width: 580px) {
          .navbar-link {
            padding: 20px 35px;
            font-size: var(--fs-3);
          }
          
          .nav-icon {
            width: 26px;
            height: 26px;
          }
        }
        
        /* Light theme adjustments */
        [data-theme="light"] .navbar {
          background: linear-gradient(145deg, var(--onyx), var(--jet));
          border-color: var(--light-gray);
        }
        
        [data-theme="light"] .navbar-item:not(:last-child) {
          border-right: 2px solid var(--light-gray-70);
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