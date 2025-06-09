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
            {getLabel('navbar.about')}
          </button>
        </li>

        <li className="navbar-item">
          <button 
            className={`navbar-link ${activePage === 'resume' ? 'active' : ''}`} 
            onClick={() => handleNavClick('resume')}
          >
            {getLabel('navbar.resume')}
          </button>
        </li>

        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
};

export default Navbar; 