import { useState, useCallback } from 'react';
import { AI_AGENT_STATUS, type AIAgentStatusType } from '../constants';

/**
 * Custom hook for managing AI chat functionality
 */
export const useAIChat = () => {
  const [aiAgentStatus, setAiAgentStatus] = useState<AIAgentStatusType>(AI_AGENT_STATUS.CHECKING);

  const updateAIStatus = useCallback((status: AIAgentStatusType) => {
    setAiAgentStatus(status);
  }, []);

  const resetAIStatus = useCallback(() => {
    setAiAgentStatus(AI_AGENT_STATUS.CHECKING);
  }, []);

  return {
    aiAgentStatus,
    updateAIStatus,
    resetAIStatus,
  };
};
