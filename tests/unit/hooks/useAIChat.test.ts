import { renderHook, act } from '@testing-library/react';
import { useAIChat } from '../../hooks/useAIChat';
import { AI_AGENT_STATUS } from '../../constants';

describe('useAIChat Hook', () => {
  test('initializes with checking status', () => {
    const { result } = renderHook(() => useAIChat());

    expect(result.current.aiAgentStatus).toBe(AI_AGENT_STATUS.CHECKING);
  });

  test('updates AI status correctly', () => {
    const { result } = renderHook(() => useAIChat());

    act(() => {
      result.current.updateAIStatus(AI_AGENT_STATUS.CONNECTED);
    });

    expect(result.current.aiAgentStatus).toBe(AI_AGENT_STATUS.CONNECTED);
  });

  test('resets AI status to checking', () => {
    const { result } = renderHook(() => useAIChat());

    // First update to a different status
    act(() => {
      result.current.updateAIStatus(AI_AGENT_STATUS.CONNECTED);
    });

    expect(result.current.aiAgentStatus).toBe(AI_AGENT_STATUS.CONNECTED);

    // Then reset
    act(() => {
      result.current.resetAIStatus();
    });

    expect(result.current.aiAgentStatus).toBe(AI_AGENT_STATUS.CHECKING);
  });

  test('updates status to disconnected', () => {
    const { result } = renderHook(() => useAIChat());

    act(() => {
      result.current.updateAIStatus(AI_AGENT_STATUS.DISCONNECTED);
    });

    expect(result.current.aiAgentStatus).toBe(AI_AGENT_STATUS.DISCONNECTED);
  });

  test('provides stable function references', () => {
    const { result, rerender } = renderHook(() => useAIChat());

    const firstUpdateFn = result.current.updateAIStatus;
    const firstResetFn = result.current.resetAIStatus;

    rerender();

    expect(result.current.updateAIStatus).toBe(firstUpdateFn);
    expect(result.current.resetAIStatus).toBe(firstResetFn);
  });
});
