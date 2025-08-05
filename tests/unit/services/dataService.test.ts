import { fetchPortfolioData } from '../../services/dataService';

// Mock the local data import
jest.mock('../../data/portfolioData.json', () => ({
  personalInfo: {
    name: 'Test User',
    avatar: 'test-avatar.jpg',
    title: 'Test Developer',
    aboutMe: ['Test about me'],
    contacts: [],
    socials: []
  },
  services: [],
  technologies: [],
  expertiseAreas: [],
  skills: {
    technical: [],
    soft: []
  },
  testimonials: [],
  resume: {
    education: [],
    experience: []
  },
  projects: []
}));

describe('dataService', () => {
  describe('fetchPortfolioData', () => {
    it('should return portfolio data from local JSON file', async () => {
      const result = await fetchPortfolioData();
      
      expect(result).toBeDefined();
      expect(result.personalInfo).toBeDefined();
      expect(result.personalInfo.name).toBe('Test User');
      expect(result.personalInfo.title).toBe('Test Developer');
      expect(result.personalInfo.avatar).toBe('test-avatar.jpg');
    });

    it('should return a Portfolio type object', async () => {
      const result = await fetchPortfolioData();
      
      // Check that all required Portfolio properties exist
      expect(result).toHaveProperty('personalInfo');
      expect(result).toHaveProperty('services');
      expect(result).toHaveProperty('technologies');
      expect(result).toHaveProperty('expertiseAreas');
      expect(result).toHaveProperty('skills');
      expect(result).toHaveProperty('testimonials');
      expect(result).toHaveProperty('resume');
      expect(result).toHaveProperty('projects');
    });

    it('should be an async function that resolves successfully', async () => {
      await expect(fetchPortfolioData()).resolves.toBeDefined();
    });
  });
});
