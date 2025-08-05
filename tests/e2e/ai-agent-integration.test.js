#!/usr/bin/env node

/**
 * AI Agent Integration Test Script
 * 
 * This script tests the connection to your AI agent application
 * Run: node test-ai-agent.js
 */

const fetch = require('node-fetch');

const AI_AGENT_ENDPOINT = process.env.REACT_APP_AI_AGENT_ENDPOINT || 'http://localhost:8000';
const API_KEY = process.env.REACT_APP_AI_AGENT_API_KEY;

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(url, options = {}) {
  try {
    const response = await fetch(url, {
      timeout: 10000,
      ...options
    });
    
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();
    
    return {
      success: response.ok,
      status: response.status,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function main() {
  log('🤖 AI Agent Integration Test', 'blue');
  log('=' * 50);
  log(`Testing endpoint: ${AI_AGENT_ENDPOINT}`, 'yellow');
  log('');

  // Test 1: Health Check
  log('1. Testing Health Check...', 'blue');
  const healthResult = await testEndpoint(`${AI_AGENT_ENDPOINT}/health`);
  
  if (healthResult.success) {
    log('✅ Health check passed', 'green');
    log(`   Response: ${JSON.stringify(healthResult.data)}`, 'green');
  } else {
    log('❌ Health check failed', 'red');
    log(`   Error: ${healthResult.error || healthResult.status}`, 'red');
  }
  log('');

  // Test 2: Agent Info
  log('2. Testing Agent Info...', 'blue');
  const infoResult = await testEndpoint(`${AI_AGENT_ENDPOINT}/info`, {
    headers: {
      ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` })
    }
  });
  
  if (infoResult.success) {
    log('✅ Agent info retrieved', 'green');
    log(`   Response: ${JSON.stringify(infoResult.data)}`, 'green');
  } else {
    log('❌ Agent info failed', 'red');
    log(`   Error: ${infoResult.error || infoResult.status}`, 'red');
  }
  log('');

  // Test 3: Initialize
  log('3. Testing Initialize...', 'blue');
  const initResult = await testEndpoint(`${AI_AGENT_ENDPOINT}/initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` })
    },
    body: JSON.stringify({
      portfolio_data: {
        personalInfo: {
          name: 'Prasad Deshpande',
          title: 'AI/ML Engineer'
        }
      },
      timestamp: new Date().toISOString(),
      action: 'initialize_portfolio_context'
    })
  });
  
  if (initResult.success) {
    log('✅ Initialize succeeded', 'green');
    log(`   Response: ${JSON.stringify(initResult.data)}`, 'green');
  } else {
    log('❌ Initialize failed', 'red');
    log(`   Error: ${initResult.error || initResult.status}`, 'red');
  }
  log('');

  // Test 4: Chat
  log('4. Testing Chat...', 'blue');
  const chatResult = await testEndpoint(`${AI_AGENT_ENDPOINT}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Portfolio-Source': 'portfolio-website',
      ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` })
    },
    body: JSON.stringify({
      message: 'What is Prasad\'s experience with AI?',
      portfolio_context: {
        personalInfo: {
          name: 'Prasad Deshpande',
          title: 'AI/ML Engineer',
          bio: 'Experienced AI engineer with expertise in machine learning and cloud technologies.'
        },
        skills: {
          technical: ['Python', 'Machine Learning', 'AI/ML', 'Cloud Architecture']
        }
      },
      timestamp: new Date().toISOString(),
      user_session: `test_session_${Date.now()}`
    })
  });
  
  if (chatResult.success) {
    log('✅ Chat test succeeded', 'green');
    log(`   Response: ${JSON.stringify(chatResult.data)}`, 'green');
  } else {
    log('❌ Chat test failed', 'red');
    log(`   Error: ${chatResult.error || chatResult.status}`, 'red');
  }
  log('');

  // Summary
  log('📊 Test Summary', 'blue');
  log('=' * 50);
  const tests = [
    { name: 'Health Check', result: healthResult.success },
    { name: 'Agent Info', result: infoResult.success },
    { name: 'Initialize', result: initResult.success },
    { name: 'Chat', result: chatResult.success }
  ];

  tests.forEach(test => {
    const status = test.result ? '✅ PASS' : '❌ FAIL';
    const color = test.result ? 'green' : 'red';
    log(`${test.name}: ${status}`, color);
  });

  const passedTests = tests.filter(t => t.result).length;
  log('');
  log(`Results: ${passedTests}/${tests.length} tests passed`, passedTests === tests.length ? 'green' : 'yellow');

  if (passedTests === tests.length) {
    log('🎉 All tests passed! Your AI agent is ready for integration.', 'green');
  } else {
    log('⚠️  Some tests failed. Check your AI agent implementation.', 'yellow');
    log('💡 Make sure your AI agent is running and implements the required endpoints.', 'blue');
  }
}

// Handle missing node-fetch gracefully
if (typeof fetch === 'undefined') {
  log('❌ This script requires node-fetch', 'red');
  log('Install it with: npm install node-fetch@2', 'yellow');
  process.exit(1);
}

main().catch(error => {
  log(`💥 Test script error: ${error.message}`, 'red');
  process.exit(1);
});
