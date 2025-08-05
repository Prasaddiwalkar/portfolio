# Test Organization

This project follows React testing best practices with a well-organized test structure.

## 📁 **Test Folder Structure**

```
src/
├── __tests__/              # Unit and integration tests
│   ├── components/         # Component tests
│   │   └── AIChat.test.tsx
│   ├── pages/              # Page component tests
│   │   └── About.test.tsx
│   ├── services/           # Service layer tests
│   │   └── aiService.test.ts
│   ├── hooks/              # Custom hook tests
│   │   └── useAIChat.test.ts
│   ├── utils/              # Utility function tests
│   │   └── labelUtils.test.ts
│   ├── integration/        # Integration tests
│   └── App.test.tsx        # Main app test
tests/
├── e2e/                    # End-to-end tests
│   └── ai-agent-integration.test.js
└── helpers/                # Test utilities and setup
    ├── setupTests.ts       # Jest DOM setup
    ├── testSetup.ts        # Global test configuration
    └── testUtils.tsx       # Test utilities and helpers
```

## 🧪 **Test Types**

### **1. Unit Tests** (`src/__tests__/`)
- **Components**: Test individual React components in isolation
- **Hooks**: Test custom React hooks behavior
- **Services**: Test API services and external integrations
- **Utils**: Test pure utility functions

### **2. Integration Tests** (`src/__tests__/integration/`)
- Test component interactions
- Test service integrations
- Test data flow between components

### **3. End-to-End Tests** (`tests/e2e/`)
- Test complete user workflows
- Test external service integrations
- Test real API endpoints

## 🛠️ **Test Configuration**

### **Jest Setup**
```json
{
  "jest": {
    "setupFilesAfterEnv": ["<rootDir>/tests/helpers/testSetup.ts"]
  }
}
```

### **Testing Library Setup**
- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for DOM assertions
- `@testing-library/user-event` for user interactions

## 📋 **Testing Patterns**

### **Component Testing**
```typescript
// Example component test
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### **Hook Testing**
```typescript
// Example hook test
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  test('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook());
    
    act(() => {
      result.current.updateValue('new value');
    });
    
    expect(result.current.value).toBe('new value');
  });
});
```

### **Service Testing**
```typescript
// Example service test
import { apiService } from '../apiService';

// Mock fetch
global.fetch = jest.fn();

describe('apiService', () => {
  test('makes correct API call', async () => {
    const mockResponse = { data: 'test' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await apiService.getData();
    
    expect(fetch).toHaveBeenCalledWith('/api/data');
    expect(result).toEqual(mockResponse);
  });
});
```

## 🚀 **Running Tests**

### **All Tests**
```bash
npm test
```

### **Watch Mode**
```bash
npm test -- --watch
```

### **Coverage Report**
```bash
npm test -- --coverage
```

### **Specific Test File**
```bash
npm test -- AIChat.test.tsx
```

### **Specific Test Pattern**
```bash
npm test -- --testNamePattern="renders correctly"
```

## 📊 **Test Coverage**

### **Coverage Goals**
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### **Coverage Report Location**
- Reports generated in `coverage/` directory
- Open `coverage/lcov-report/index.html` for detailed report

## 🎯 **Best Practices**

### **1. Test Organization**
- **Co-locate tests** with source code when appropriate
- **Mirror folder structure** in test directories
- **Group related tests** using `describe` blocks

### **2. Test Naming**
- **Descriptive test names** that explain what is being tested
- **Use "should" or action-based naming**: `"should update status when connected"`
- **Group by functionality**: `describe('when user is logged in')`

### **3. Test Structure**
- **Arrange**: Set up test data and mocks
- **Act**: Execute the functionality being tested
- **Assert**: Verify the expected outcome

### **4. Mocking Strategy**
- **Mock external dependencies** (APIs, services)
- **Use `jest.mock()` for module mocking**
- **Create **helper functions** for common mocks

### **5. Data Management**
- **Use test utilities** for common test data
- **Create mock factories** for complex objects
- **Keep test data minimal** and focused

## 🔧 **Test Utilities**

### **Custom Render Function**
```typescript
import { renderWithProviders } from '../../tests/helpers/testUtils';

// Use instead of regular render for components that need providers
renderWithProviders(<MyComponent />);
```

### **Mock Data**
```typescript
import { mockPortfolioData } from '../../tests/helpers/testUtils';

// Use consistent mock data across tests
render(<About {...mockPortfolioData} />);
```

### **Async Testing**
```typescript
import { waitForAsync } from '../../tests/helpers/testUtils';

// Wait for async operations
await waitForAsync();
```

## 🐛 **Debugging Tests**

### **Debug Mode**
```bash
npm test -- --debug
```

### **Verbose Output**
```bash
npm test -- --verbose
```

### **Update Snapshots**
```bash
npm test -- --updateSnapshot
```

### **Run Failed Tests**
```bash
npm test -- --onlyFailures
```

This test organization provides comprehensive coverage while maintaining maintainability and following React testing best practices.
