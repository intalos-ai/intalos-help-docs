# Frontend Testing Guide

This document provides comprehensive guidance for testing the React frontend application using Vitest and React Testing Library.

## 🚨 E2E Testing Status

**E2E Testing is currently DISABLED** but preserved for future use. See `E2E-DISABLED-README.md` for re-enabling instructions.

## 🚀 Quick Start

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI (if @vitest/ui is installed)
npm run test:ui
```

### Test File Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── LoadingIndicator.test.jsx
│   │   └── BotTopicCard.test.jsx
│   ├── LoadingIndicator.jsx
│   └── BotTopicCard.jsx
├── pages/
│   ├── __tests__/
│   │   └── Dashboard.test.jsx
│   └── Dashboard.jsx
├── __tests__/
│   └── theme.test.js
└── test/
    ├── setup.js
    └── test-utils.jsx
```

## 🧪 Testing Stack

- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM environment for Node.js
- **@testing-library/user-event**: User interaction simulation

## 📝 Test File Naming Conventions

- **Component tests**: `ComponentName.test.jsx` in `__tests__/` folder
- **Page tests**: `PageName.test.jsx` in `__tests__/` folder
- **Utility tests**: `utilityName.test.js` in `__tests__/` folder
- **Integration tests**: `featureName.integration.test.jsx`

## 🎯 Testing Patterns

### 1. Component Testing

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderWithProviders } from '../test/test-utils'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders without crashing', () => {
    renderWithProviders(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    renderWithProviders(<MyComponent />)
    
    const button = screen.getByRole('button', { name: /Click me/i })
    await user.click(button)
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### 2. Page Testing

```jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../test/test-utils'
import MyPage from '../MyPage'

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('../api', () => ({
  default: { get: vi.fn() },
}))

describe('MyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches data on mount', async () => {
    const mockApi = require('../api').default
    mockApi.get.mockResolvedValue({ data: { name: 'Test' } })

    renderWithProviders(<MyPage />)

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalledWith('/api/data/')
    })
  })
})
```

### 3. Utility Testing

```jsx
import { describe, it, expect } from 'vitest'
import { formatDate, validateEmail } from '../utils'

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date)).toBe('Jan 1, 2024')
  })
})

describe('validateEmail', () => {
  it('validates correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })

  it('rejects invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false)
  })
})
```

## 🔧 Test Utilities

### renderWithProviders

Custom render function that includes all necessary providers:

```jsx
import { renderWithProviders } from '../test/test-utils'

// Basic usage
renderWithProviders(<MyComponent />)

// With custom route
renderWithProviders(<MyComponent />, { route: '/custom-route' })

// With custom theme
renderWithProviders(<MyComponent />, { theme: customTheme })
```

### Mock Data

Pre-defined mock data for common entities:

```jsx
import { mockUser, mockBotTopic, mockIntegration } from '../test/test-utils'

// Use in tests
const component = renderWithProviders(
  <UserProfile user={mockUser} />
)
```

### API Mocking

```jsx
import { mockApi } from '../test/test-utils'

// Mock successful response
mockApi.get.mockResolvedValue({ data: { name: 'Test' } })

// Mock error response
mockApi.get.mockRejectedValue(new Error('API Error'))
```

## 🎭 Mocking Strategies

### 1. External Libraries

```jsx
// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '123' }),
}))

// Mock Material-UI components
vi.mock('@mui/material', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}))
```

### 2. API Calls

```jsx
// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

// Mock custom API module
vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))
```

### 3. Browser APIs

```jsx
// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock window.location
delete window.location
window.location = {
  href: 'http://localhost:3000',
  pathname: '/',
  search: '',
  hash: '',
}
```

## 📊 Coverage

### Running Coverage

```bash
npm run test:coverage
```

### Coverage Thresholds

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Coverage Reports

Coverage reports are generated in multiple formats:
- **Text**: Console output
- **JSON**: `coverage/coverage-summary.json`
- **HTML**: `coverage/index.html`

## 🚨 Common Issues & Solutions

### 1. Component Not Rendering

```jsx
// Check if component is wrapped in necessary providers
renderWithProviders(<MyComponent />)

// Check for missing dependencies
vi.mock('missing-dependency', () => ({}))
```

### 2. Async Operations Not Working

```jsx
// Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})

// Mock timers if needed
vi.useFakeTimers()
vi.runAllTimers()
```

### 3. Router Issues

```jsx
// Ensure useNavigate is properly mocked
const mockNavigate = vi.fn()
vi.mocked(require('react-router-dom').useNavigate).mockReturnValue(mockNavigate)
```

## 🧹 Best Practices

### 1. Test Organization

- Group related tests using `describe` blocks
- Use descriptive test names
- Keep tests focused and atomic
- Test one behavior per test

### 2. Mocking

- Mock at the right level (API calls, not implementation details)
- Use `beforeEach` to reset mocks
- Keep mocks simple and focused
- Document complex mocks

### 3. Assertions

- Use semantic queries (`getByRole`, `getByLabelText`)
- Avoid testing implementation details
- Test user behavior, not component internals
- Use meaningful assertions

### 4. Performance

- Mock heavy operations (API calls, file operations)
- Use `vi.useFakeTimers()` for time-based operations
- Avoid unnecessary re-renders in tests
- Clean up after tests

## 🔍 Debugging Tests

### 1. Console Output

```jsx
// Enable console.log in tests
// Uncomment in setup.js
// log: vi.fn(),
```

### 2. Debug Mode

```jsx
// Use debug() to see component output
import { debug } from '@testing-library/react'

const { debug } = renderWithProviders(<MyComponent />)
debug()
```

### 3. Screen Queries

```jsx
// Use screen.debug() to see current DOM
screen.debug()

// Use screen.debug(element) to see specific element
screen.debug(screen.getByRole('button'))
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## 🤝 Contributing

When adding new tests:

1. Follow the existing naming conventions
2. Use the provided test utilities
3. Mock external dependencies appropriately
4. Write meaningful test descriptions
5. Ensure good coverage of edge cases
6. Update this documentation if needed

## 📈 Next Steps

- Add integration tests for complex user workflows
- Implement visual regression testing
- Add performance testing for critical paths
- Set up continuous integration with automated testing
- Add accessibility testing with axe-core


