// AI Service for integrating with external AI Agent application
// This service communicates with your separate AI agent application

export interface AIServiceConfig {
  agentEndpoint?: string;
  apiKey?: string;
  timeout?: number;
}

export class AIService {
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      agentEndpoint: config.agentEndpoint || process.env.REACT_APP_AI_AGENT_ENDPOINT || 'http://localhost:8000',
      apiKey: config.apiKey || process.env.REACT_APP_AI_AGENT_API_KEY,
      timeout: config.timeout || 30000, // 30 seconds
      ...config
    };
  }

  /**
   * Send a message to your external AI agent application
   * 
   * @param message - User's message
   * @param context - Portfolio context (automatically provided)
   * @returns Promise<string> - AI agent response
   */
  async sendMessage(message: string, context?: any): Promise<string> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const payload = {
        message,
        portfolio_context: context,
        timestamp: new Date().toISOString(),
        user_session: this.generateSessionId()
      };

      const response = await fetch(`${this.config.agentEndpoint}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
          'X-Portfolio-Source': 'portfolio-website'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`AI Agent returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response || data.message || "I couldn't process your request at the moment.";
      
    } catch (error) {
      console.error('AI Agent Communication Error:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('AI Agent response timed out. Please try again.');
      }
      
      // Return a helpful error message instead of throwing
      return `I'm currently unable to connect to the AI assistant. Please try again in a moment, or feel free to contact ${context?.personalInfo?.name || 'the portfolio owner'} directly through the provided contact information.`;
    }
  }

  /**
   * Generate a unique session ID for tracking conversations
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initialize the AI agent with portfolio data
   * Sends portfolio context to your external AI agent application
   */
  async initialize(portfolioData?: any): Promise<void> {
    if (!portfolioData) {
      console.log('No portfolio data provided for AI agent initialization');
      return;
    }

    try {
      const response = await fetch(`${this.config.agentEndpoint}/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
          'X-Portfolio-Source': 'portfolio-website'
        },
        body: JSON.stringify({
          portfolio_data: portfolioData,
          timestamp: new Date().toISOString(),
          action: 'initialize_portfolio_context'
        })
      });

      if (response.ok) {
        console.log('AI Agent successfully initialized with portfolio data');
      } else {
        console.warn(`AI Agent initialization returned ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to initialize AI Agent with portfolio data:', error);
      // Don't throw error - initialization failure shouldn't break the app
    }
  }

  /**
   * Update portfolio context in your AI agent
   * Call this when portfolio data changes
   */
  async updatePortfolioContext(portfolioData: any): Promise<void> {
    try {
      const response = await fetch(`${this.config.agentEndpoint}/update-context`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
          'X-Portfolio-Source': 'portfolio-website'
        },
        body: JSON.stringify({
          portfolio_data: portfolioData,
          timestamp: new Date().toISOString(),
          action: 'update_portfolio_context'
        })
      });

      if (response.ok) {
        console.log('AI Agent portfolio context updated successfully');
      } else {
        console.warn(`AI Agent context update returned ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to update AI Agent portfolio context:', error);
    }
  }

  /**
   * Health check for your AI agent application
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.agentEndpoint}/health`, {
        method: 'GET',
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('AI Agent health check failed:', error);
      return false;
    }
  }

  /**
   * Get AI agent status and information
   */
  async getAgentInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.config.agentEndpoint}/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });

      if (response.ok) {
        return await response.json();
      }
      
      return { status: 'unknown', message: 'Unable to get agent info' };
    } catch (error) {
      console.error('Failed to get AI Agent info:', error);
      return { status: 'error', message: 'Agent not reachable' };
    }
  }
}

// Export a default instance
export const aiService = new AIService();
