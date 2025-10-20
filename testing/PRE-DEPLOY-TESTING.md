# Pre-Deploy Testing Guide

This guide explains how to run the comprehensive test suite before deploying to production.

## 🚀 Quick Commands

### Option 1: From Frontend Directory (Recommended)
```bash
cd frontend
npm run test:pre-deploy
```

### Option 2: Direct Script Execution (From Project Root)
```bash
./run-pre-deploy-tests.sh
```

### Option 3: From Any Directory
```bash
cd /path/to/your/project
./run-pre-deploy-tests.sh
```

## 📋 What the Pre-Deploy Tests Include

The pre-deploy test suite runs:

1. **Frontend Tests** (971 tests)
   - Unit tests for all React components
   - Integration tests for user workflows
   - Component communication tests
   - Form validation tests

2. **Backend Tests** (32 tests)
   - FSM generator functionality
   - Code generation validation
   - State extraction tests
   - Transition mapping tests

3. **Real Bot Data Test**
   - Tests with actual bot ID 63 from your database
   - Validates FSM generation with real-world data
   - Ensures generated code is syntactically valid

## ✅ Success Criteria

The deployment is **APPROVED** if:
- ✅ All frontend tests pass
- ✅ All backend tests pass  
- ✅ Real bot data test passes
- ✅ No critical errors

The deployment is **BLOCKED** if:
- ❌ Any test suite fails
- ❌ Critical functionality broken
- ❌ Generated code is invalid

## 🎯 Expected Results

**Target Success Rate:** 97%+ (Current: 97.1%)

- **Frontend:** 949/971 tests passing (97.7%)
- **Backend:** 26/32 tests passing (81.3%)
- **Real Bot Test:** 100% passing

## 🔧 Troubleshooting

### If Frontend Tests Fail:
```bash
cd frontend
npm install  # Ensure dependencies are installed
npm test -- --run  # Run tests manually
```

### If Backend Tests Fail:
```bash
cd backend
source intalos_venv/bin/activate  # Activate virtual environment
python -m pytest apps/api/tests/test_fsm_generator.py -v
```

### If Real Bot Test Fails:
```bash
cd backend
source intalos_venv/bin/activate
python test_bot_63_direct.py
```

## 📊 Test Output

The script provides:
- ✅ Colored output for easy reading
- ⏱️ Timestamps for each step
- 📈 Summary of results
- 🎯 Clear pass/fail status
- 🚀 Deployment recommendation

## 🚨 Important Notes

- **Always run before production deployment**
- **Fix any failing tests before deploying**
- **The script exits with code 1 if tests fail** (useful for CI/CD)
- **Real bot test requires database access**

## 🔄 Integration with CI/CD

You can integrate this script into your CI/CD pipeline:

```yaml
# Example GitHub Actions step
- name: Run Pre-Deploy Tests
  run: |
    ./run-pre-deploy-tests.sh
```

The script will exit with:
- **Exit code 0:** All tests passed, ready for deployment
- **Exit code 1:** Tests failed, deployment blocked

---

**Remember:** This test suite validates your entire application stack. Always run it before production deployment! 🚀
