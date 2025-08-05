#!/bin/bash

# Script to open coverage reports in the browser

echo "🧪 Opening Coverage Reports..."

# Check if coverage directory exists
if [ ! -d "coverage" ]; then
    echo "❌ Coverage directory not found. Please run 'npm run test:coverage' first."
    exit 1
fi

# Open the custom Jest coverage report if available
if [ -f "coverage/custom-report.html" ]; then
    echo "📊 Opening custom Jest coverage report..."
    open coverage/custom-report.html
else
    echo "⚠️  Custom report not found. Run 'npm run coverage:report' to generate it."
fi

# Open the standard HTML report if available
if [ -f "coverage/index.html" ]; then
    echo "📈 Opening standard HTML coverage report..."
    open coverage/index.html
else
    echo "⚠️  Standard HTML report not found."
fi

echo "✅ Coverage reports opened in your default browser!"
