import React from 'react';
import '../../styles/components/layout/Navbar.css';
import getLabel from '../../utils/labelUtils';

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
    </nav>
  );
};

export default Navbar; 