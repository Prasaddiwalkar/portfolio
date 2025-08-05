/**
 * Application constants
 */

// Navigation constants
export const NAVIGATION_PAGES = {
  ABOUT: 'about',
  RESUME: 'resume',
} as const;

// AI Chat constants
export const AI_CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 1000,
  TYPING_DELAY: 1000,
  PLACEHOLDER_TEXT: 'Ask me anything about my portfolio...',
} as const;

// AI Agent Status constants
export const AI_AGENT_STATUS = {
  CHECKING: 'checking',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
} as const;

// Animation constants
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type NavigationPage = typeof NAVIGATION_PAGES[keyof typeof NAVIGATION_PAGES];
export type AIAgentStatusType = typeof AI_AGENT_STATUS[keyof typeof AI_AGENT_STATUS];
export type Theme = typeof THEMES[keyof typeof THEMES];
