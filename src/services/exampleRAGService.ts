// Example AI Service Implementation
// Replace this with your actual RAG integration

import { AIService, AIServiceConfig } from './aiService';

export class ExampleRAGService extends AIService {
  private apiEndpoint: string;
  private apiKey: string;

  constructor(config: AIServiceConfig & { apiEndpoint: string; apiKey: string }) {
    super(config);
    this.apiEndpoint = config.apiEndpoint;
    this.apiKey = config.apiKey;
  }

  /**
   * Example implementation using a custom API endpoint
   * Replace this with your actual AI/RAG service
   */
  async sendMessage(message: string, portfolioContext?: any): Promise<string> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          message,
          context: {
            portfolio: portfolioContext,
            instructions: `You are an AI assistant for ${portfolioContext?.personalInfo?.name || 'this'} portfolio website. 
                         Use the provided portfolio context to answer questions about their:
                         - Professional experience and work history
                         - Technical skills and expertise areas
                         - Education and certifications
                         - Projects and achievements
                         - Services offered
                         
                         Provide helpful, accurate responses based on the portfolio data.
                         If asked about information not in the portfolio, politely indicate 
                         that you can only provide information available in their portfolio.`
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response || data.message || "I couldn't process your request.";

    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  async initialize(portfolioData?: any): Promise<void> {
    // Initialize your vector database or AI service here
    console.log('Example RAG Service initialized with portfolio data');
    
    // Example: Send portfolio data to your AI service for indexing
    if (portfolioData && this.apiEndpoint) {
      try {
        await fetch(`${this.apiEndpoint}/initialize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            portfolioData,
            type: 'portfolio_initialization'
          })
        });
      } catch (error) {
        console.error('Failed to initialize AI service with portfolio data:', error);
      }
    }
  }
}

// Example usage:
// const ragService = new ExampleRAGService({
//   apiEndpoint: process.env.REACT_APP_AI_ENDPOINT || 'https://your-ai-api.com/chat',
//   apiKey: process.env.REACT_APP_AI_API_KEY || 'your-api-key'
// });

// Integration examples for popular AI services:

/*
// OpenAI GPT Integration
export class OpenAIRAGService extends AIService {
  async sendMessage(message: string, portfolioContext?: any): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant for ${portfolioContext?.personalInfo?.name || 'this'} portfolio. Context: ${JSON.stringify(portfolioContext)}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "I couldn't process your request.";
  }
}
*/

/*
// Anthropic Claude Integration
export class ClaudeRAGService extends AIService {
  async sendMessage(message: string, portfolioContext?: any): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        system: `You are an AI assistant for ${portfolioContext?.personalInfo?.name || 'this'} portfolio. Context: ${JSON.stringify(portfolioContext)}`,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });
    
    const data = await response.json();
    return data.content[0]?.text || "I couldn't process your request.";
  }
}
*/

/*
// Local AI Model Integration (e.g., Ollama)
export class LocalAIService extends AIService {
  async sendMessage(message: string, portfolioContext?: any): Promise<string> {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',
        prompt: `You are an AI assistant for ${portfolioContext?.personalInfo?.name || 'this'} portfolio. 
                Context: ${JSON.stringify(portfolioContext)}
                
                User question: ${message}
                
                Response:`,
        stream: false
      })
    });
    
    const data = await response.json();
    return data.response || "I couldn't process your request.";
  }
}
*/
