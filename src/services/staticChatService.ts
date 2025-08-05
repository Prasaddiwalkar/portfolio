import portfolioData from '../data/portfolioData.json';
import sampleQAData from '../data/sampleQA.json';

interface QAItem {
  question: string;
  answer: string;
  keywords: string[];
}

// Import Q&A data from JSON file
const defaultQA: QAItem[] = sampleQAData.defaultQA;

// Simple keyword matching function
function findBestMatch(userInput: string): QAItem | null {
  const input = userInput.toLowerCase();
  let bestMatch: QAItem | null = null;
  let bestScore = 0;

  for (const qa of defaultQA) {
    let score = 0;
    for (const keyword of qa.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    
    // Boost score for exact question matches
    if (input.includes(qa.question.toLowerCase())) {
      score += 10;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

// Default suggested questions for quick access
export const suggestedQuestions = sampleQAData.suggestedQuestions;

export const getStaticResponse = (userInput: string): string => {
  const match = findBestMatch(userInput);
  
  if (match) {
    return match.answer;
  }

  // Default fallback responses for common patterns
  if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
    return `Hello! I'm here to help you learn about ${portfolioData.personalInfo.name}, a ${portfolioData.personalInfo.title} with 17+ years of experience. Feel free to ask about his skills, experience, projects, or anything else you'd like to know!`;
  }

  if (userInput.toLowerCase().includes('help')) {
    return "I can help you learn about Prasad's background, technical skills, work experience, projects, and expertise areas. Try asking about his current role, technologies he works with, or his experience with specific areas like Gen AI, leadership, or cloud technologies.";
  }

  // Generic fallback
  return `I'd be happy to help you learn more about ${portfolioData.personalInfo.name}! You can ask me about his experience, technical skills, projects, or any specific technology you're interested in. Some popular topics include his work with Gen AI, enterprise architecture, leadership experience, and his current role at Equinix.`;
};

const staticChatService = {
  getStaticResponse,
  suggestedQuestions,
  defaultQA
};

export default staticChatService;
