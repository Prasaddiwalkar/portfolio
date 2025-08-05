# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run test:coverage`

Runs all tests with code coverage analysis and generates comprehensive coverage reports.\
Multiple output formats are generated in the `coverage/` directory including HTML, JSON, LCOV, and Clover XML.

### `npm run coverage:report`

Generates a custom Jest HTML coverage report with visual progress bars and detailed file-by-file analysis.\
The report is saved to `coverage/custom-report.html` and provides an elegant, easy-to-read coverage overview.

### `npm run coverage:open`

Opens the generated coverage reports in your default browser for easy viewing.\
This will open both the standard HTML report and the Jasmine-style report if available.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Code Coverage

This project includes comprehensive code coverage reporting with multiple output formats and custom styling.

### Running Coverage Tests

#### Basic Coverage Report
```bash
npm run test:coverage
```
Runs all tests with coverage analysis and generates reports in multiple formats (HTML, JSON, LCOV, Clover XML).

#### Enhanced Jest Coverage Report
```bash
npm run coverage:report
```
Generates a custom Jest HTML report with visual progress bars, color-coded coverage indicators, and detailed file analysis.

#### View Coverage Reports
```bash
npm run coverage:open
```
Opens generated coverage reports in your default browser.

### Coverage Output Formats

All coverage reports are generated in the `coverage/` directory:

- **`coverage/index.html`** - Standard Jest HTML report
- **`coverage/custom-report.html`** - Enhanced Jest report with visual enhancements
- **`coverage/lcov-report/`** - Detailed LCOV HTML reports
- **`coverage/coverage-final.json`** - Raw coverage data in JSON format
- **`coverage/clover.xml`** - Clover XML format for CI/CD integration
- **`coverage/lcov.info`** - LCOV format for tools like SonarQube

### Coverage Thresholds

The project enforces minimum coverage thresholds:
- **Statements**: 60%
- **Branches**: 60%
- **Functions**: 60%
- **Lines**: 60%

These thresholds can be adjusted in `package.json` under `jest.coverageThreshold`.

### Understanding Coverage Reports

- **Green bars**: Good coverage (≥80%)
- **Yellow bars**: Medium coverage (50-79%)
- **Red bars**: Low coverage (<50%)

For detailed coverage documentation, see `COVERAGE.md`.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Prasad Deshpande Portfolio

## Adding Icons to Technology/Expertise Tags

The portfolio has been updated to use a tag-based system for technologies and areas of expertise. While most tags should use text only, you can add icons to specific tags by following these instructions:

### For Technologies

To add an icon to a technology tag, use the following HTML structure:

```html
<div class="tech-item with-icon">
  <img src="./assets/images/devops.svg" class="icon-devops" alt="DevOps icon">
  <span>DevOps</span>
</div>
```

### For Areas of Expertise

Similarly, for areas of expertise:

```html
<div class="expertise-item with-icon">
  <img src="./assets/images/platform-engineering.svg" class="icon-platform-engineering" alt="Platform Engineering icon">
  <span>Platform Engineering</span>
</div>
```

### Available Icons

Currently, the portfolio includes the following specialized icons:
- Platform Engineering: `./assets/images/platform-engineering.svg` with class `icon-platform-engineering`
- DevOps: `./assets/images/devops.svg` with class `icon-devops`

### Adding New Icons

To add more icons:

1. Create an SVG file in the `src/assets/images/` directory
2. Make sure the SVG uses `#FFFFFF` as the fill color
3. Add the icon to your tag using the HTML structure above
4. If needed, add specific styling for your icon in the CSS

### Icon Styling

The icons are automatically styled to match the theme (dark or light mode). The base styling is in `src/style.css`.
