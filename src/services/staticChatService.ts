import portfolioData from '../data/portfolioData.json';
import sampleQAData from '../data/sampleQA.json';

interface QAItem {
  question: string;
  answer: string;
  keywords: string[];
}

// Helper function to replace hardcoded names with portfolio data
function replaceName(text: string): string {
  const name = portfolioData.personalInfo.name;
  
  // Check if we're in template mode (name contains placeholders)
  if (name.includes('[') || name === '[YOUR FULL NAME]') {
    return text
      .replace(/Prasad's/g, "the portfolio owner's")
      .replace(/Prasad/g, 'the portfolio owner');
  }
  
  const firstName = name.split(' ')[0];
  
  return text
    .replace(/Prasad's/g, `${firstName}'s`)
    .replace(/Prasad/g, firstName);
}

// Process suggested questions dynamically
export const suggestedQuestions = sampleQAData.suggestedQuestions.map(replaceName);

// Simple keyword matching function
function findBestMatch(userInput: string): QAItem | null {
  const input = userInput.toLowerCase();
  let bestMatch: QAItem | null = null;
  let bestScore = 0;

  for (const qa of sampleQAData.defaultQA) {
    let score = 0;
    for (const keyword of qa.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    
    // Boost score for exact question matches
    const processedQuestion = replaceName(qa.question);
    if (input.includes(processedQuestion.toLowerCase())) {
      score += 10;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

export const getStaticResponse = (userInput: string): string => {
  const match = findBestMatch(userInput);
  
  if (match) {
    return replaceName(match.answer);
  }

  // Default fallback responses for common patterns
  const name = portfolioData.personalInfo.name;
  const title = portfolioData.personalInfo.title;

  if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
    return `Hello! I'm here to help you learn about ${name}, a ${title} with 17+ years of experience. Feel free to ask about their skills, experience, projects, or anything else you'd like to know!`;
  }

  if (userInput.toLowerCase().includes('help')) {
    return `I can help you learn about ${name}'s background, technical skills, work experience, projects, and expertise areas. Try asking about their current role, technologies they work with, or their experience with specific areas like Gen AI, leadership, or cloud technologies.`;
  }

  // Generic fallback
  return `I'd be happy to help you learn more about ${name}! Try asking about their experience, skills, projects, or use one of the suggested questions.`;
};

const staticChatService = {
  getStaticResponse,
  suggestedQuestions
};

export default staticChatService;
