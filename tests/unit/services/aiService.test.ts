import { AIService } from '../../services/aiService';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('AIService', () => {
  let aiService: AIService;
  
  const mockPortfolioData = {
    personalInfo: {
      name: 'Test User',
      title: 'Developer'
    },
    skills: [],
    experience: []
  };

  beforeEach(() => {
    mockFetch.mockClear();
    aiService = new AIService({
      agentEndpoint: 'http://localhost:8000',
      apiKey: 'test-key',
      timeout: 5000,
    });
  });

  describe('sendMessage', () => {
    test('sends message successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ response: 'AI response' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await aiService.sendMessage('Test message', { test: 'context' });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/chat',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-key',
            'X-Portfolio-Source': 'portfolio-website',
          }),
          body: expect.stringContaining('Test message'),
        })
      );

      expect(result).toBe('AI response');
    });

    test('handles error response gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await aiService.sendMessage('Test message');

      expect(result).toContain('unable to connect');
    });

    test('handles network error gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await aiService.sendMessage('Test message');

      expect(result).toContain('unable to connect');
    });

    test('handles timeout gracefully', async () => {
      const aiServiceWithShortTimeout = new AIService({
        timeout: 1, // 1ms timeout
      });

      // Mock a slow response
      mockFetch.mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      );

      const result = await aiServiceWithShortTimeout.sendMessage('Test message');

      expect(result).toContain('unable to connect');
    });
  });

  describe('healthCheck', () => {
    test('returns true when service is healthy', async () => {
      const mockResponse = { ok: true };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await aiService.healthCheck();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/health',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-key',
          }),
        })
      );

      expect(result).toBe(true);
    });

    test('returns false when service is unhealthy', async () => {
      const mockResponse = { ok: false };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await aiService.healthCheck();

      expect(result).toBe(false);
    });

    test('returns false on network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await aiService.healthCheck();

      expect(result).toBe(false);
    });
  });

  describe('initialize', () => {
    test('initializes with portfolio data successfully', async () => {
      const mockResponse = { ok: true };
      mockFetch.mockResolvedValue(mockResponse);

      const portfolioData = { name: 'Test Portfolio' };
      await aiService.initialize(portfolioData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/initialize',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-key',
            'X-Portfolio-Source': 'portfolio-website',
          }),
          body: expect.stringContaining('Test Portfolio'),
        })
      );
    });

    test('handles initialization error gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      // Should not throw
      await expect(aiService.initialize({ test: 'data' })).resolves.not.toThrow();
    });

    test('skips initialization when no data provided', async () => {
      await aiService.initialize();

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('getAgentInfo', () => {
    test('returns agent info successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ status: 'active', version: '1.0.0' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await aiService.getAgentInfo();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/info',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-key',
          }),
        })
      );

      expect(result).toEqual({ status: 'active', version: '1.0.0' });
    });

    test('returns error info when request fails', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await aiService.getAgentInfo();

      expect(result).toEqual({ status: 'error', message: 'Agent not reachable' });
    });

    test('returns unknown status when response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: jest.fn()
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await aiService.getAgentInfo();

      expect(result).toEqual({ status: 'unknown', message: 'Unable to get agent info' });
    });
  });

  describe('Error handling and edge cases', () => {
    test('handles timeout errors specifically in sendMessage', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'AbortError';
      
      mockFetch.mockRejectedValue(timeoutError);

      await expect(aiService.sendMessage('test')).rejects.toThrow('AI Agent response timed out. Please try again.');
    });

    test('returns helpful error message for general errors in sendMessage', async () => {
      mockFetch.mockRejectedValue(new Error('Service error'));

      const result = await aiService.sendMessage('test');
      expect(result).toBe("I'm currently unable to connect to the AI assistant. Please try again in a moment, or feel free to contact Prasad directly through the provided contact information.");
    });

    test('handles undefined response in sendMessage', async () => {
      mockFetch.mockResolvedValue(undefined);

      const result = await aiService.sendMessage('test');
      expect(result).toBe("I'm currently unable to connect to the AI assistant. Please try again in a moment, or feel free to contact Prasad directly through the provided contact information.");
    });

    test('logs warning when initialization returns non-ok status', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request'
      });

      await aiService.initialize(mockPortfolioData);

      expect(consoleSpy).toHaveBeenCalledWith('AI Agent initialization returned 400: Bad Request');
      consoleSpy.mockRestore();
    });
  });

  describe('updatePortfolioContext', () => {
    test('successfully updates portfolio context', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200
      });

      await aiService.updatePortfolioContext(mockPortfolioData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/update-context',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'X-Portfolio-Source': 'portfolio-website'
          }),
          body: expect.stringContaining('"action":"update_portfolio_context"')
        })
      );

      expect(consoleSpy).toHaveBeenCalledWith('AI Agent portfolio context updated successfully');
      consoleSpy.mockRestore();
    });

    test('handles unsuccessful context update', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await aiService.updatePortfolioContext(mockPortfolioData);

      expect(consoleSpy).toHaveBeenCalledWith('AI Agent context update returned 500: Internal Server Error');
      consoleSpy.mockRestore();
    });

    test('handles context update errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      mockFetch.mockRejectedValue(new Error('Network error'));

      await aiService.updatePortfolioContext(mockPortfolioData);

      expect(consoleSpy).toHaveBeenCalledWith('Failed to update AI Agent portfolio context:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});
