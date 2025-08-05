import getLabel from '../../utils/labelUtils';

// Mock the labels JSON to match actual structure
jest.mock('../../data/labels.json', () => ({
  sidebar: {
    showMore: 'Show More',
    showLess: 'Show Less',
    themeDark: 'Switch to light mode',
    themeLight: 'Switch to dark mode'
  },
  about: {
    title: 'About me',
    whatImDoing: 'What i\'m doing',
    areasOfExpertise: 'Areas of Expertise',
    technologies: 'Technologies'
  },
  resume: {
    title: 'Resume',
    education: 'Education',
    experience: 'Experience',
    technicalSkills: 'Technical Skills',
    softSkills: 'Soft Skills'
  },
  navbar: {
    about: 'About',
    resume: 'Resume',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contact'
  },
  contacts: {
    email: 'Email',
    phone: 'Phone',
    birthday: 'Birthday',
    location: 'Location',
    resume: 'Resume',
    downloadCV: 'Download CV'
  }
}));

describe('labelUtils', () => {
  describe('getLabel', () => {
    test('returns label for existing key', () => {
      const result = getLabel('navbar.about');
      expect(result).toBe('About');
    });

    test('returns nested label for dotted key', () => {
      const result = getLabel('about.title');
      expect(result).toBe('About me');
    });

    test('returns default value when label not found', () => {
      const result = getLabel('non.existing.key', 'default');
      expect(result).toBe('default');
    });

    test('returns empty string for non-existing key without default', () => {
      const result = getLabel('non.existing.key');
      expect(result).toBe('');
    });

    test('handles empty string key', () => {
      const result = getLabel('', 'default');
      expect(result).toBe('default');
    });

    test('handles null/undefined gracefully', () => {
      // These should return default value since input validation fails
      const result1 = getLabel(null as any, 'null-default');
      const result2 = getLabel(undefined as any, 'undefined-default');
      
      expect(result1).toBe('null-default');
      expect(result2).toBe('undefined-default');
    });

    test('is case sensitive', () => {
      const result1 = getLabel('navbar.about');
      const result2 = getLabel('navbar.About', 'not-found');
      
      expect(result1).toBe('About');
      expect(result2).toBe('not-found');
    });

    test('returns correct labels for all expected keys', () => {
      const testCases = [
        { key: 'resume.title', expected: 'Resume' },
        { key: 'contacts.email', expected: 'Email' },
        { key: 'about.technologies', expected: 'Technologies' },
        { key: 'resume.experience', expected: 'Experience' },
        { key: 'navbar.resume', expected: 'Resume' },
        { key: 'sidebar.showMore', expected: 'Show More' },
        { key: 'contacts.downloadCV', expected: 'Download CV' },
      ];

      testCases.forEach(({ key, expected }) => {
        expect(getLabel(key)).toBe(expected);
      });
    });
  });
});
