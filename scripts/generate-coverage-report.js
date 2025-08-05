const fs = require('fs');
const path = require('path');

// Read the coverage data
const coverageFile = path.join(__dirname, '..', 'coverage', 'coverage-final.json');
const coverageData = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));

// Generate Jest-based HTML coverage report
function generateCoverageReport(coverageData) {
  const files = Object.keys(coverageData);
  let totalStatements = 0;
  let coveredStatements = 0;
  let totalBranches = 0;
  let coveredBranches = 0;
  let totalFunctions = 0;
  let coveredFunctions = 0;
  let totalLines = 0;
  let coveredLines = 0;

  // Calculate totals
  files.forEach(file => {
    const data = coverageData[file];
    if (!data) return;
    
    totalStatements += Object.keys(data.s || {}).length;
    coveredStatements += Object.values(data.s || {}).filter(v => v > 0).length;
    
    totalBranches += Object.keys(data.b || {}).length * 2; // Each branch has 2 paths
    Object.values(data.b || {}).forEach(branch => {
      if (Array.isArray(branch)) {
        coveredBranches += branch.filter(v => v > 0).length;
      }
    });
    
    totalFunctions += Object.keys(data.f || {}).length;
    coveredFunctions += Object.values(data.f || {}).filter(v => v > 0).length;
    
    totalLines += Object.keys(data.l || {}).length;
    coveredLines += Object.values(data.l || {}).filter(v => v > 0).length;
  });

  const statementsPercent = totalStatements > 0 ? (coveredStatements / totalStatements * 100).toFixed(2) : 0;
  const branchesPercent = totalBranches > 0 ? (coveredBranches / totalBranches * 100).toFixed(2) : 0;
  const functionsPercent = totalFunctions > 0 ? (coveredFunctions / totalFunctions * 100).toFixed(2) : 0;
  const linesPercent = totalLines > 0 ? (coveredLines / totalLines * 100).toFixed(2) : 0;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Jasmine-Style Coverage Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background-color: #5cb85c; color: white; padding: 10px; border-radius: 5px; }
        .summary { margin: 20px 0; }
        .metric { display: inline-block; margin: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        .metric-value { font-size: 24px; font-weight: bold; }
        .metric-label { font-size: 14px; color: #666; }
        .file-list { margin-top: 20px; }
        .file-item { padding: 5px; border-bottom: 1px solid #eee; }
        .coverage-bar { width: 200px; height: 20px; background-color: #ddd; border-radius: 10px; overflow: hidden; display: inline-block; }
        .coverage-fill { height: 100%; background-color: #5cb85c; }
        .low-coverage { background-color: #d9534f; }
        .medium-coverage { background-color: #f0ad4e; }
        .high-coverage { background-color: #5cb85c; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Portfolio Project - Jest Coverage Report</h1>
        <p>Generated: ${new Date().toISOString()}</p>
    </div>
    
    <div class="summary">
        <h2>Overall Coverage Summary</h2>
        <div class="metric">
            <div class="metric-value">${statementsPercent}%</div>
            <div class="metric-label">Statements (${coveredStatements}/${totalStatements})</div>
        </div>
        <div class="metric">
            <div class="metric-value">${branchesPercent}%</div>
            <div class="metric-label">Branches (${coveredBranches}/${totalBranches})</div>
        </div>
        <div class="metric">
            <div class="metric-value">${functionsPercent}%</div>
            <div class="metric-label">Functions (${coveredFunctions}/${totalFunctions})</div>
        </div>
        <div class="metric">
            <div class="metric-value">${linesPercent}%</div>
            <div class="metric-label">Lines (${coveredLines}/${totalLines})</div>
        </div>
    </div>
    
    <div class="file-list">
        <h2>File Coverage Details</h2>
        ${files.map(file => {
          const data = coverageData[file];
          if (!data) return '';
          
          const fileStatements = Object.keys(data.s || {}).length;
          const fileCoveredStatements = Object.values(data.s || {}).filter(v => v > 0).length;
          const fileStatementsPercent = fileStatements > 0 ? (fileCoveredStatements / fileStatements * 100).toFixed(1) : 0;
          const coverageClass = fileStatementsPercent >= 80 ? 'high-coverage' : fileStatementsPercent >= 50 ? 'medium-coverage' : 'low-coverage';
          
          return `
            <div class="file-item">
                <strong>${file.replace(process.cwd(), '')}</strong>
                <div class="coverage-bar" style="margin-left: 20px;">
                    <div class="coverage-fill ${coverageClass}" style="width: ${fileStatementsPercent}%;"></div>
                </div>
                <span style="margin-left: 10px;">${fileStatementsPercent}% (${fileCoveredStatements}/${fileStatements} statements)</span>
            </div>
          `;
        }).filter(Boolean).join('')}
    </div>
    
    <div style="margin-top: 30px; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
        <h3>Jest Coverage Thresholds</h3>
        <p>Current thresholds: Statements: 60%, Branches: 60%, Functions: 60%, Lines: 60%</p>
        <p>Status: ${statementsPercent >= 60 && branchesPercent >= 60 && functionsPercent >= 60 && linesPercent >= 60 ? 
          '<span style="color: green;">✓ PASSED</span>' : 
          '<span style="color: red;">✗ FAILED</span>'}</p>
    </div>
</body>
</html>
  `;

  return html;
}

// Generate and save the report
const coverageReport = generateCoverageReport(coverageData);
const outputPath = path.join(__dirname, '..', 'coverage', 'custom-report.html');
fs.writeFileSync(outputPath, coverageReport);

console.log('✓ Custom Jest coverage report generated at:', outputPath);
console.log('✓ Open the file in your browser to view the report');
