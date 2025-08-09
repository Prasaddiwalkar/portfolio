import { ExampleRAGService } from '../../services/exampleRAGService';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ExampleRAGService', () => {
  let ragService: ExampleRAGService;

  beforeEach(() => {
    mockFetch.mockClear();
    ragService = new ExampleRAGService({
      agentEndpoint: 'http://localhost:8000',
      apiKey: 'rag-api-key',
      timeout: 5000,
      apiEndpoint: 'http://localhost:9000/ai'
    });
  });

  describe('sendMessage', () => {
    test('sends message successfully with portfolio context', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ 
          response: 'AI response from RAG service',
          confidence: 0.95 
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const portfolioContext = {
        personalInfo: { name: 'Test User', title: 'Developer' },
        skills: ['React', 'Node.js']
      };

      const result = await ragService.sendMessage('Tell me about skills', portfolioContext);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:9000/ai',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer rag-api-key',
          },
          body: expect.stringContaining('Tell me about skills'),
        })
      );

      expect(result).toBe('AI response from RAG service');
    });

    test('sends message without portfolio context', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ 
          response: 'Generic AI response' 
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await ragService.sendMessage('Hello');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:9000/ai',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('Hello'),
        })
      );

      expect(result).toBe('Generic AI response');
    });

    test('handles HTTP error responses', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(ragService.sendMessage('test')).rejects.toThrow('HTTP error! status: 500');
    });

    test('handles network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(ragService.sendMessage('test')).rejects.toThrow('Failed to communicate with AI service: Network error');
    });

    test('handles malformed JSON response', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(ragService.sendMessage('test')).rejects.toThrow('Failed to parse AI response: Invalid JSON');
    });

    test('handles response without expected format', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ 
          data: 'Response without expected response field' 
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await ragService.sendMessage('test');

      expect(result).toBe('Sorry, I received an unexpected response format from the AI service.');
    });

    test('includes correct portfolio instructions in context', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ response: 'Response' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await ragService.sendMessage('test', { skills: ['React'] });

      const callArgs = mockFetch.mock.calls[0][1];
      const body = JSON.parse(callArgs.body);
      
      expect(body.context.instructions).toContain('portfolio website');
      expect(body.context.instructions).toContain('Professional experience and work history');
      expect(body.context.instructions).toContain('Technical skills and expertise areas');
    });
  });

  describe('healthCheck', () => {
    test('successfully checks health', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ status: 'healthy' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await ragService.healthCheck();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:9000/ai/health',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Authorization': 'Bearer rag-api-key',
          },
        })
      );

      expect(result).toBe(true);
    });

    test('returns false for unhealthy service', async () => {
      const mockResponse = {
        ok: false,
        status: 503,
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await ragService.healthCheck();

      expect(result).toBe(false);
    });

    test('returns false on network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await ragService.healthCheck();

      expect(result).toBe(false);
    });
  });

  describe('initialize', () => {
    test('successfully initializes with portfolio data', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ message: 'Initialized successfully' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const portfolioData = {
        personalInfo: { name: 'Test User', title: 'Developer' },
        skills: ['React']
      };

      await ragService.initialize(portfolioData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:9000/ai/initialize',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer rag-api-key',
          },
          body: expect.stringContaining('"name":"Test User"'),
        })
      );
    });

    test('handles initialization failure', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
      };
      mockFetch.mockResolvedValue(mockResponse);

      const portfolioData = { personalInfo: { name: 'Test' } };

      await expect(ragService.initialize(portfolioData)).rejects.toThrow('Failed to initialize AI service: HTTP 400');
    });

    test('handles initialization network error', async () => {
      mockFetch.mockRejectedValue(new Error('Connection refused'));

      const portfolioData = { personalInfo: { name: 'Test' } };

      await expect(ragService.initialize(portfolioData)).rejects.toThrow('Failed to initialize AI service: Connection refused');
    });
  });
});
