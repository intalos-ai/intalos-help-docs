# End-to-End (E2E) Testing

This directory contains comprehensive end-to-end tests for the React application using Playwright.

## Overview

E2E tests validate complete user workflows and ensure the application works correctly in a real browser environment. These tests complement our unit and integration tests by testing the full application stack.

## Test Structure

```
e2e/
├── auth/                    # Authentication flow tests
│   ├── login.spec.js       # Login functionality
│   └── register.spec.js    # User registration
├── bot-management/         # Bot CRUD operations
│   └── bot-crud.spec.js    # Create, read, update, delete bots
├── integrations/           # Integration management
│   └── whatsapp.spec.js    # WhatsApp integration setup
├── navigation/             # Navigation and routing
│   └── navigation.spec.js  # Page navigation and routing
├── utils/                  # Test utilities and helpers
│   └── test-helpers.js     # Common E2E test functions
├── full-user-journey.spec.js # Complete user workflow
└── README.md              # This file
```

## Running E2E Tests

### Prerequisites

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

### Test Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Debug E2E tests
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

### Running Specific Tests

```bash
# Run specific test file
npx playwright test auth/login.spec.js

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests in specific browser
npx playwright test --project=chromium
```

## Test Categories

### 1. Authentication Tests (`auth/`)
- **Login Flow**: Valid/invalid credentials, error handling, redirects
- **Registration Flow**: Form validation, duplicate emails, success cases
- **Session Management**: Token expiration, logout, persistent sessions

### 2. Bot Management Tests (`bot-management/`)
- **CRUD Operations**: Create, read, update, delete bots
- **Bot Settings**: Configuration changes, validation
- **Error Handling**: Network errors, permission issues

### 3. Integration Tests (`integrations/`)
- **WhatsApp Integration**: Setup, configuration, management
- **Form Validation**: Required fields, data validation
- **API Integration**: Success/error responses

### 4. Navigation Tests (`navigation/`)
- **Page Navigation**: Menu navigation, direct URLs
- **Routing**: Protected routes, 404 handling
- **Browser Navigation**: Back/forward buttons, refresh

### 5. Full User Journey (`full-user-journey.spec.js`)
- **Complete Workflow**: Registration → Login → Bot Creation → Integration Setup
- **Data Consistency**: Cross-page data validation
- **Error Recovery**: Graceful error handling throughout journey

## Test Utilities

### `test-helpers.js`

Common utility functions for E2E tests:

- `loginUser()` - Authenticate a user
- `registerUser()` - Register a new user
- `createBot()` - Create a new bot
- `deleteBot()` - Delete a bot
- `waitForPageLoad()` - Wait for page to be fully loaded
- `clearBrowserData()` - Clear cookies and storage
- `takeScreenshot()` - Take debugging screenshots

## Configuration

### `playwright.config.js`

Key configuration options:

- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Base URL**: `http://localhost:3000`
- **Timeouts**: 30s default, 10s for integration tests
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: On failure only
- **Videos**: Retained on failure
- **Traces**: On first retry

## Mocking Strategy

E2E tests use API mocking to:
- **Control responses**: Predictable test data
- **Test error scenarios**: Network failures, validation errors
- **Isolate frontend**: Focus on UI behavior
- **Speed up tests**: No backend dependencies

### Mock Examples

```javascript
// Mock successful login
await page.route('**/api/token/', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      access: 'mock-access-token',
      refresh: 'mock-refresh-token'
    })
  });
});

// Mock error response
await page.route('**/api/bottopics/', async route => {
  await route.fulfill({
    status: 500,
    contentType: 'application/json',
    body: JSON.stringify({
      detail: 'Internal server error'
    })
  });
});
```

## Best Practices

### 1. Test Organization
- **One test file per feature**: Keep tests focused
- **Descriptive test names**: Clear intent and expected behavior
- **Group related tests**: Use `test.describe()` blocks

### 2. Test Data
- **Use realistic data**: Mimic real user scenarios
- **Clean up after tests**: Clear browser data between tests
- **Mock consistently**: Use the same mock data across related tests

### 3. Assertions
- **Test user-visible behavior**: Focus on what users see/experience
- **Wait for elements**: Use `waitForPageLoad()` and `waitForSelector()`
- **Check multiple aspects**: URL, content, interactions

### 4. Error Handling
- **Test error scenarios**: Network failures, validation errors
- **Verify error messages**: Users see appropriate feedback
- **Test recovery**: Can users recover from errors?

## Debugging

### 1. Screenshots
Tests automatically take screenshots on failure:
```bash
# View screenshots
ls e2e-screenshots/
```

### 2. Videos
Failed tests record videos:
```bash
# View videos
ls test-results/
```

### 3. Traces
Detailed execution traces:
```bash
# View traces
npx playwright show-trace test-results/trace.zip
```

### 4. Debug Mode
Run tests in debug mode:
```bash
npm run test:e2e:debug
```

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npm run test:e2e

- name: Upload test results
  uses: actions/upload-artifact@v3
  if: failure()
  with:
    name: playwright-report
    path: playwright-report/
```

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Increase timeout in `playwright.config.js`
   - Check if dev server is running
   - Verify network requests are completing

2. **Elements not found**
   - Use `waitForSelector()` instead of `locator()`
   - Check if page is fully loaded
   - Verify element selectors are correct

3. **Flaky tests**
   - Add proper waits and assertions
   - Use `waitForPageLoad()` consistently
   - Mock API responses to avoid network delays

4. **Browser issues**
   - Update Playwright: `npx playwright install`
   - Check browser compatibility
   - Use specific browser: `--project=chromium`

## Contributing

### Adding New Tests

1. **Create test file** in appropriate directory
2. **Use existing utilities** from `test-helpers.js`
3. **Mock API responses** for predictable behavior
4. **Add descriptive test names** and comments
5. **Test both success and error scenarios**

### Test Naming Convention

```javascript
test('should [expected behavior] when [condition]', async ({ page }) => {
  // Test implementation
});
```

### Example Test Structure

```javascript
import { test, expect } from '@playwright/test';
import { loginUser, waitForPageLoad } from '../utils/test-helpers.js';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup for each test
  });

  test('should handle success case', async ({ page }) => {
    // Mock success response
    await page.route('**/api/endpoint/', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    // Test implementation
    await page.goto('/page');
    await waitForPageLoad(page);
    
    // Assertions
    await expect(page.locator('selector')).toBeVisible();
  });

  test('should handle error case', async ({ page }) => {
    // Mock error response
    await page.route('**/api/endpoint/', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Bad request' })
      });
    });

    // Test implementation
    // ...
  });
});
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
