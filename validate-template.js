#!/usr/bin/env node

/**
 * Template Validation Script
 * 
 * Validates that all template placeholders have been replaced
 * Run: node validate-template.js
 */

const fs = require('fs');
const path = require('path');

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

function validateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { valid: false, message: 'File not found' };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const placeholders = content.match(/\[([A-Z_\s]+)\]/g) || [];
  
  if (placeholders.length > 0) {
    return {
      valid: false,
      message: `Found ${placeholders.length} placeholders`,
      placeholders: placeholders
    };
  }

  return { valid: true, message: 'All placeholders replaced' };
}

function validatePortfolioData() {
  const filePath = path.join(__dirname, 'src', 'data', 'portfolioData.json');
  const result = validateFile(filePath);
  
  log('\\n📄 Validating portfolioData.json...', 'blue');
  
  if (result.valid) {
    log('✅ Portfolio data is valid', 'green');
  } else {
    log(`❌ ${result.message}`, 'red');
    if (result.placeholders) {
      log('   Found placeholders:', 'yellow');
      result.placeholders.forEach(p => log(`   • ${p}`, 'yellow'));
    }
  }
  
  return result.valid;
}

function validateQAData() {
  const filePath = path.join(__dirname, 'src', 'data', 'sampleQA.json');
  const result = validateFile(filePath);
  
  log('\\n💬 Validating sampleQA.json...', 'blue');
  
  if (result.valid) {
    log('✅ Q&A data is valid', 'green');
  } else {
    log(`❌ ${result.message}`, 'red');
    if (result.placeholders) {
      log('   Found placeholders:', 'yellow');
      result.placeholders.forEach(p => log(`   • ${p}`, 'yellow'));
    }
  }
  
  return result.valid;
}

function validateAssets() {
  log('\\n🖼️ Validating assets...', 'blue');
  
  const requiredAssets = [
    'public/assets/images/my-avatar.png',
    'public/favicon.ico'
  ];
  
  let allValid = true;
  
  requiredAssets.forEach(asset => {
    const exists = fs.existsSync(path.join(__dirname, asset));
    if (exists) {
      log(`✅ ${asset}`, 'green');
    } else {
      log(`❌ Missing: ${asset}`, 'red');
      allValid = false;
    }
  });
  
  return allValid;
}

function checkPersonalData() {
  log('\\n👤 Checking personal data...', 'blue');
  
  try {
    const portfolioPath = path.join(__dirname, 'src', 'data', 'portfolioData.json');
    const data = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));
    
    const checks = [
      {
        name: 'Name',
        value: data.personalInfo?.name,
        test: (v) => v && v !== '[YOUR FULL NAME]' && v.length > 2
      },
      {
        name: 'Email',
        value: data.personalInfo?.contacts?.find(c => c.titleKey === 'contacts.email')?.value,
        test: (v) => v && v.includes('@') && !v.includes('[')
      },
      {
        name: 'Title',
        value: data.personalInfo?.title,
        test: (v) => v && !v.includes('[') && v.length > 5
      },
      {
        name: 'About Me',
        value: data.personalInfo?.aboutMe,
        test: (v) => Array.isArray(v) && v.length > 0 && !v[0].includes('[')
      }
    ];
    
    let allValid = true;
    
    checks.forEach(check => {
      if (check.test(check.value)) {
        log(`✅ ${check.name}: Valid`, 'green');
      } else {
        log(`❌ ${check.name}: Needs attention`, 'red');
        allValid = false;
      }
    });
    
    return allValid;
    
  } catch (error) {
    log(`❌ Error reading portfolio data: ${error.message}`, 'red');
    return false;
  }
}

function main() {
  log('🔍 Portfolio Template Validation', 'blue');
  log('='.repeat(50), 'blue');
  
  const results = [
    validatePortfolioData(),
    validateQAData(),
    validateAssets(),
    checkPersonalData()
  ];
  
  const allValid = results.every(r => r);
  
  log('\\n📊 Validation Summary', 'blue');
  log('='.repeat(50), 'blue');
  
  if (allValid) {
    log('🎉 All validations passed!', 'green');
    log('Your portfolio template is ready for deployment.', 'green');
  } else {
    log('⚠️  Some validations failed.', 'yellow');
    log('\\n📝 Next Steps:', 'blue');
    log('1. Run: npm run setup (for guided setup)', 'cyan');
    log('2. Or manually edit src/data/portfolioData.json', 'cyan');
    log('3. Add your profile photo: public/assets/images/my-avatar.png', 'cyan');
    log('4. Run this validation again: node validate-template.js', 'cyan');
  }
  
  process.exit(allValid ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { main };
