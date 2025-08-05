import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Mock portfolio data for tests
export const mockPortfolioData = {
  personalInfo: {
    name: 'Test User',
    title: 'Software Developer',
    avatar: '/test-avatar.jpg',
    aboutMe: 'Test bio content',
    contacts: [
      { type: 'email', value: 'test@example.com', icon: 'email' },
      { type: 'phone', value: '+1234567890', icon: 'phone' },
      { type: 'location', value: 'Test City', icon: 'location' },
    ],
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/test', icon: 'linkedin' },
      { platform: 'website', url: 'https://test.com', icon: 'website' },
    ],
  },
  services: [
    {
      id: '1',
      title: 'Web Development',
      description: 'Building modern web applications',
      icon: '/icons/web.svg',
    },
  ],
  technologies: [
    {
      id: '1',
      name: 'React',
      category: 'Frontend',
      proficiency: 90,
      logo: '/logos/react.svg',
    },
  ],
  expertiseAreas: [
    {
      id: '1',
      title: 'Frontend Development',
      description: 'Expert in modern frontend technologies',
      icon: '/icons/frontend.svg',
    },
  ],
  skills: {
    technical: [
      { id: '1', name: 'JavaScript', level: 90 },
      { id: '2', name: 'React', level: 95 },
    ],
    soft: [
      { id: '1', name: 'Communication', level: 85 },
      { id: '2', name: 'Leadership', level: 80 },
    ],
  },
  resume: {
    education: [
      {
        id: '1',
        institution: 'Test University',
        degree: 'Computer Science',
        period: '2020-2024',
        description: 'Bachelor of Science in Computer Science',
      },
    ],
    experience: [
      {
        id: '1',
        company: 'Test Company',
        position: 'Software Developer',
        period: '2022-Present',
        description: 'Developing web applications',
        achievements: ['Built React applications', 'Improved performance'],
      },
    ],
  },
};

// Custom render function that includes common providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any providers or context here in the future
}

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: CustomRenderOptions
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Add any providers here (e.g., Theme, Router, etc.)
    return <>{children}</>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// Export everything from testing-library
export * from '@testing-library/react';
export { renderWithProviders as render };

// Helper function to create mock functions with TypeScript support
export const createMockFunction = <T extends (...args: any[]) => any>(
  implementation?: T
) => {
  return jest.fn(implementation);
};

// Helper to wait for async operations
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

// Mock window.location
export const mockLocation = (url: string) => {
  delete (window as any).location;
  window.location = new URL(url) as any;
};

// Mock localStorage
export const mockLocalStorage = () => {
  const store: { [key: string]: string } = {};
  
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach(key => delete store[key]); },
    },
    writable: true,
  });
};
