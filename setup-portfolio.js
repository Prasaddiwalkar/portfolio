#!/usr/bin/env node

/**
 * Portfolio Template Setup Script
 * 
 * This script helps you quickly set up your portfolio with your personal data
 * Run: node setup-portfolio.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function askQuestion(rl, question, defaultValue = '') {
  return new Promise(resolve => {
    const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
    rl.question(prompt, answer => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function collectPersonalInfo(rl) {
  log('\\n📝 Personal Information', 'bold');
  log('='.repeat(50), 'blue');
  
  const personalInfo = {
    name: await askQuestion(rl, 'Full Name'),
    title: await askQuestion(rl, 'Professional Title (e.g., "Senior Software Engineer")'),
    email: await askQuestion(rl, 'Email Address'),
    phone: await askQuestion(rl, 'Phone Number'),
    location: await askQuestion(rl, 'Location (e.g., "New York, USA")'),
    linkedin: await askQuestion(rl, 'LinkedIn URL'),
    github: await askQuestion(rl, 'GitHub URL (optional)', ''),
    resumeLink: await askQuestion(rl, 'Resume Download Link', '')
  };

  log('\\n📄 About Me Section', 'bold');
  log('Please provide 2-3 paragraphs about yourself:', 'cyan');
  
  const aboutParagraphs = [];
  for (let i = 1; i <= 3; i++) {
    const paragraph = await askQuestion(rl, `Paragraph ${i} (or press Enter to skip)`);
    if (paragraph) aboutParagraphs.push(paragraph);
  }
  
  personalInfo.aboutMe = aboutParagraphs;
  return personalInfo;
}

async function collectExperience(rl) {
  log('\\n💼 Work Experience', 'bold');
  log('='.repeat(50), 'blue');
  
  const experiences = [];
  let addMore = true;
  
  while (addMore) {
    log(`\\nExperience #${experiences.length + 1}:`, 'cyan');
    
    const experience = {
      company: await askQuestion(rl, 'Company Name'),
      position: await askQuestion(rl, 'Your Position'),
      startDate: await askQuestion(rl, 'Start Date (e.g., "Jan 2020")'),
      endDate: await askQuestion(rl, 'End Date (or "Present")', 'Present'),
      description: await askQuestion(rl, 'Brief description of your role')
    };
    
    experiences.push(experience);
    
    const more = await askQuestion(rl, 'Add another experience? (y/n)', 'n');
    addMore = more.toLowerCase() === 'y';
  }
  
  return experiences;
}

async function collectSkills(rl) {
  log('\\n🛠️ Skills & Technologies', 'bold');
  log('='.repeat(50), 'blue');
  
  log('Enter your top skills (comma-separated):', 'cyan');
  const skillsInput = await askQuestion(rl, 'Skills (e.g., "JavaScript, Python, React, Node.js")');
  const skills = skillsInput.split(',').map(skill => skill.trim()).filter(Boolean);
  
  return skills;
}

function generatePortfolioData(personalInfo, experiences, skills) {
  const template = {
    personalInfo: {
      name: personalInfo.name,
      avatar: "/assets/images/my-avatar.png",
      title: personalInfo.title,
      aboutMe: personalInfo.aboutMe,
      contacts: [
        {
          icon: "/assets/images/icons/mail-outline.svg",
          titleKey: "contacts.email",
          value: personalInfo.email,
          link: `mailto:${personalInfo.email}`
        },
        {
          icon: "/assets/images/icons/phone-portrait-outline.svg",
          titleKey: "contacts.phone", 
          value: personalInfo.phone,
          link: personalInfo.phone
        },
        {
          icon: "/assets/images/icons/location-outline.svg",
          titleKey: "contacts.location",
          value: personalInfo.location
        },
        {
          icon: "/assets/images/icons/download-outline.svg",
          titleKey: "contacts.resume",
          valueKey: "contacts.downloadCV",
          link: personalInfo.resumeLink
        }
      ],
      socials: [
        {
          platform: "LinkedIn",
          icon: "/assets/images/icons/logo-linkedin.svg",
          url: personalInfo.linkedin
        }
      ]
    },
    services: [
      {
        title: "Software Development",
        description: "Full-stack development services",
        icon: "/assets/images/icon-dev.svg"
      }
    ],
    skills: {
      technologies: skills.map(skill => ({
        name: skill,
        level: "80",
        category: "Technical"
      }))
    },
    experience: experiences.map(exp => ({
      company: exp.company,
      position: exp.position,
      period: `${exp.startDate} — ${exp.endDate}`,
      description: exp.description,
      technologies: skills.slice(0, 3),
      highlights: []
    })),
    projects: [],
    education: []
  };

  if (personalInfo.github) {
    template.personalInfo.socials.push({
      platform: "GitHub",
      icon: "/assets/images/icons/logo-github.svg",
      url: personalInfo.github
    });
  }

  return template;
}

function generateQAData(personalInfo) {
  const firstName = personalInfo.name.split(' ')[0];
  
  return {
    defaultQA: [
      {
        question: `What is ${firstName}'s current role and experience?`,
        answer: `I am currently working as a ${personalInfo.title}. You can contact me at ${personalInfo.email} for more details about my experience.`,
        keywords: ["experience", "role", "current", "position", "years"]
      },
      {
        question: `Where is ${firstName} located and how can I contact them?`,
        answer: `**Location:** 📍 ${personalInfo.location}\\n\\n**Contact Information:**\\n• **Email:** ${personalInfo.email}\\n• **LinkedIn:** [Connect on LinkedIn](${personalInfo.linkedin})\\n\\n*Feel free to reach out for collaboration opportunities!*`,
        keywords: ["contact", "location", "email", "linkedin"]
      }
    ],
    suggestedQuestions: [
      `What is ${firstName}'s current role and experience?`,
      `How can I contact ${firstName}?`
    ]
  };
}

async function main() {
  log('🚀 Portfolio Template Setup', 'bold');
  log('='.repeat(50), 'blue');
  log('Welcome! This script will help you set up your portfolio with your personal data.\\n', 'cyan');
  
  const rl = createInterface();
  
  try {
    // Collect information
    const personalInfo = await collectPersonalInfo(rl);
    const experiences = await collectExperience(rl);
    const skills = await collectSkills(rl);
    
    // Generate data files
    log('\\n🔧 Generating your portfolio data...', 'yellow');
    
    const portfolioData = generatePortfolioData(personalInfo, experiences, skills);
    const qaData = generateQAData(personalInfo);
    
    // Write files
    const portfolioPath = path.join(__dirname, 'src', 'data', 'portfolioData.json');
    const qaPath = path.join(__dirname, 'src', 'data', 'sampleQA.json');
    
    fs.writeFileSync(portfolioPath, JSON.stringify(portfolioData, null, 2));
    fs.writeFileSync(qaPath, JSON.stringify(qaData, null, 2));
    
    log('\\n✅ Portfolio setup complete!', 'green');
    log('\\n📁 Files created:', 'blue');
    log(`   • ${portfolioPath}`, 'cyan');
    log(`   • ${qaPath}`, 'cyan');
    
    log('\\n🚀 Next steps:', 'yellow');
    log('1. Add your profile photo to: public/assets/images/my-avatar.png', 'cyan');
    log('2. Update your resume link in portfolioData.json', 'cyan');
    log('3. Add project images to: public/assets/images/', 'cyan');
    log('4. Run: npm start', 'cyan');
    
    log('\\n🎉 Your portfolio is ready!', 'green');
    
  } catch (error) {
    log(`\\n❌ Error: ${error.message}`, 'red');
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
