# E2E Testing - Currently Disabled

## Status: 🚫 DISABLED

The E2E testing infrastructure has been temporarily disabled but is preserved for future use.

## What's Disabled

- All E2E test scripts in `package.json` have been renamed to `*:disabled`
- E2E tests won't run accidentally
- All E2E test files and configurations are preserved

## How to Re-enable E2E Testing

### Option 1: Quick Re-enable (Recommended)
```bash
# In frontend/package.json, rename these scripts:
"test:e2e:disabled" → "test:e2e"
"test:e2e:ui:disabled" → "test:e2e:ui"
"test:e2e:headed:disabled" → "test:e2e:headed"
"test:e2e:debug:disabled" → "test:e2e:debug"
"test:e2e:report:disabled" → "test:e2e:report"
"test:e2e:real:disabled" → "test:e2e:real"
"test:e2e:real:ui:disabled" → "test:e2e:real:ui"
"test:e2e:real:headed:disabled" → "test:e2e:real:headed"
"test:e2e:real:debug:disabled" → "test:e2e:real:debug"
```

### Option 2: Use Direct Commands
```bash
# Mocked E2E tests
npx playwright test
npx playwright test --ui
npx playwright test --headed

# Real backend E2E tests
npx playwright test --config=playwright.config.real-backend.js
npx playwright test --config=playwright.config.real-backend.js --ui
```

## What's Preserved

### Test Files
- `frontend/e2e/` - Mocked E2E tests
- `frontend/e2e-real/` - Real backend E2E tests
- `frontend/playwright.config.js` - Mocked E2E config
- `frontend/playwright.config.real-backend.js` - Real backend E2E config

### Test Infrastructure
- Database management utilities
- Test helpers and utilities
- Authentication flow tests
- Bot management tests
- Integration tests

### Documentation
- `frontend/E2E-TESTING-SUMMARY.md`
- `frontend/E2E-TESTING-COMPARISON.md`
- `frontend/e2e-real/README.md`
- `frontend/e2e-real/DATABASE-MANAGEMENT.md`

## Current Test Status

- **Unit Tests**: ✅ Active (`npm test`)
- **Integration Tests**: ✅ Active (`npm test`)
- **E2E Tests**: 🚫 Disabled (but preserved)

## Dependencies

All E2E testing dependencies are still installed:
- `@playwright/test`
- `playwright` browsers
- All test utilities and helpers

## Quick Test Commands (When Re-enabled)

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run real backend tests
npm run test:e2e:real

# Run specific test file
npx playwright test auth/authentication-flows.spec.js
```

---

**Note**: This infrastructure was successfully tested and working before being disabled. All tests were passing and the real backend integration was functional.
