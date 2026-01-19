# CustomCode Component

## Overview

The **CustomCode** component allows you to write custom Python code to perform advanced operations, complex validations, data transformations, and custom logic that goes beyond the built-in components.

## When to Use CustomCode

Ideal for scenarios like:
- Complex data validation and formatting
- Advanced string manipulation
- Custom business logic
- Multi-step calculations
- Data transformations
- Pattern matching and extraction
- Custom algorithms

---

## Configuration

### Writing Your Code

Click on the CustomCode component to open the code editor.

**Required structure**:
```python
def __custom_fn__(variables):
    # Your code here
   
    # Access variables
    user_name = variables.get('userName', '')
    user_age = variables['userAge']
   
    # Your logic
    result = some_calculation()
   
    # Update variables (optional)
    variables['newVariable'] = result
   
    # Return your result
    return result
```

**Key points**:
- Must define `__custom_fn__(variables)`
- Receives `variables` dictionary as parameter
- Can read and modify variables
- Must return a value

### Store Result in Variable

Save the return value:

1. In **"Store output in variable"**, enter a variable name:
   ```
   Example: processedData
   Example: validationResult
   Example: formattedOutput
   ```

2. The value returned by `__custom_fn__` will be stored in this variable

---

## Accessing Variables

### Reading Variables

```python
def __custom_fn__(variables):
    # Method 1: Safe access with default
    name = variables.get('userName', 'Guest')
   
    # Method 2: Direct access (raises error if missing)
    email = variables['userEmail']
   
    # Method 3: Check if exists
    if 'userAge' in variables:
        age = variables['userAge']
```

**Hint**: Use `variables['variable_name']` or `variables.get('variable_name', 'default_value')` to access variables in your code.

### Updating Variables

```python
def __custom_fn__(variables):
    # Update existing variable
    variables['userName'] = "John Doe"
   
    # Create new variable
    variables['processedEmail'] = email.lower()
   
    # Update multiple variables
    variables['firstName'] = "John"
    variables['lastName'] = "Doe"
   
    return "Success"
```

---

## Available Built-in Functions

Your code has access to these safe Python built-ins:

| Function | Purpose | Example |
|----------|---------|---------|
| `int(x)` | Convert to integer | `int("123")` -> 123 |
| `float(x)` | Convert to decimal | `float("10.5")` -> 10.5 |
| `str(x)` | Convert to string | `str(123)` -> "123" |
| `len(x)` | Get length | `len("hello")` -> 5 |
| `min(a, b, ...)` | Find minimum | `min(5, 10, 3)` -> 3 |
| `max(a, b, ...)` | Find maximum | `max(5, 10, 3)` -> 10 |
| `sum(list)` | Sum numbers | `sum([1, 2, 3])` -> 6 |
| `bool(x)` | Convert to boolean | `bool("text")` -> True |

## Available Modules

The following modules are pre-imported and available for use:

### datetime Module

For date and time operations:

```python
import datetime

# Get current date
today = datetime.date.today()

# Parse date string
date_obj = datetime.datetime.strptime("2024-12-25", "%Y-%m-%d")

# Create date object
birth_date = datetime.date(1990, 5, 15)

# Calculate age
age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
```

**Available classes**:
- `datetime.date` - Date operations
- `datetime.datetime` - Date and time operations
- `datetime.timedelta` - Time differences

### time Module

For time-related operations (used internally by datetime):

```python
# The time module is available for datetime operations
# datetime.date.today() uses time internally
```

**Note**: Direct imports are not allowed, but `datetime` and `time` are pre-imported. No file access, no network requests.

---

## Use Cases & Examples

### 1. Email Validation

```python
def __custom_fn__(variables):
    email = variables.get('userEmail', '')
   
    # Check if email has @ and .
    has_at = '@' in email
    has_dot = '.' in email
    is_valid = has_at and has_dot and len(email) > 5
   
    if is_valid:
        variables['emailValidated'] = True
        return "valid"
    else:
        variables['emailValidated'] = False
        return "invalid"
```

**Output routing**:
- Return "valid" -> Email valid path
- Return "invalid" -> Error message path

### 2. Name Formatting

```python
def __custom_fn__(variables):
    full_name = variables.get('userName', '')
   
    # Split into first and last name
    parts = full_name.split(' ', 1)
    first_name = parts[0] if len(parts) > 0 else ''
    last_name = parts[1] if len(parts) > 1 else ''
   
    # Store separately
    variables['firstName'] = first_name.capitalize()
    variables['lastName'] = last_name.capitalize()
   
    # Create formatted version
    formatted = f"{first_name.upper()} {last_name.upper()}"
   
    return formatted
```

### 3. Price Calculation with Tax

```python
def __custom_fn__(variables):
    subtotal = float(variables.get('subtotal', 0))
    tax_rate = float(variables.get('taxRate', 0.1))
   
    # Calculate tax
    tax_amount = subtotal * tax_rate
    total = subtotal + tax_amount
   
    # Store results
    variables['taxAmount'] = round(tax_amount, 2)
    variables['orderTotal'] = round(total, 2)
   
    return round(total, 2)
```

### 4. Phone Number Formatting

```python
def __custom_fn__(variables):
    phone = variables.get('userPhone', '')
   
    # Remove all non-digits
    digits = ''.join(c for c in phone if c.isdigit())
   
    # Format as (XXX) XXX-XXXX
    if len(digits) == 10:
        formatted = f"({digits[0:3]}) {digits[3:6]}-{digits[6:10]}"
        variables['formattedPhone'] = formatted
        return formatted
    else:
        return "invalid"
```

### 5. Age Category Calculation

```python
def __custom_fn__(variables):
    age = int(variables.get('userAge', 0))
   
    if age < 18:
        category = "minor"
    elif age < 65:
        category = "adult"
    else:
        category = "senior"
   
    variables['ageCategory'] = category
    return category
```

**Output routing**:
- "minor" -> Minor flow
- "adult" -> Adult flow
- "senior" -> Senior flow

### 6. Age Calculation from Date of Birth

```python
def __custom_fn__(variables):
    import datetime
    
    # Get date of birth from variable (format: YYYY-MM-DD)
    dob_str = variables.get('user_date_of_birth', '')
    
    if not dob_str:
        raise ValueError("Date of birth is required")
    
    # Parse the date
    dob = datetime.datetime.strptime(dob_str, "%Y-%m-%d").date()
    
    # Get today's date
    today = datetime.date.today()
    
    # Calculate age
    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    
    variables['user_age'] = age
    return age
```

**Note**: Uses pre-imported `datetime` module for date operations.

### 7. Text Analysis

```python
def __custom_fn__(variables):
    user_text = variables.get('userFeedback', '')
   
    # Analyze text
    word_count = len(user_text.split())
    char_count = len(user_text)
    has_positive = any(word in user_text.lower() for word in ['good', 'great', 'excellent', 'happy'])
   
    # Store analysis
    variables['wordCount'] = word_count
    variables['charCount'] = char_count
    variables['sentiment'] = 'positive' if has_positive else 'neutral'
   
    return word_count
```

---

## Flow Routing

### Success/Error Routing

Every CustomCode component has two output paths:

1. **Success port** (green):
   - Used when code executes without errors
   - Return value can be used for further routing
  
2. **Error port** (red, if enabled):
   - Used when code raises an exception
   - Catches syntax errors, runtime errors
   - Routes to error handling flow

### Custom Return Value Routing

The value you return determines the flow:

```python
def __custom_fn__(variables):
    score = int(variables.get('testScore', 0))
   
    if score >= 90:
        return "excellent"
    elif score >= 70:
        return "good"
    elif score >= 50:
        return "pass"
    else:
        return "fail"
```

Then connect outputs:
- "excellent" -> High achiever path
- "good" -> Good performance path
- "pass" -> Standard path
- "fail" -> Retry path

---

## Best Practices

### Code Quality

**DO**:
- Write clear, readable code
- Add comments for complex logic
- Handle edge cases (empty values, None)
- Use try-except for risky operations
- Test thoroughly before publishing

**DON'T**:
- Write overly complex code in one component
- Ignore error handling
- Assume variables exist without checking
- Use Python features not in allowed list

### Variable Access

**DO**:
```python
# Safe with default
name = variables.get('userName', 'Guest')

# Check before access
if 'userAge' in variables:
    age = variables['userAge']

# Type conversion with safety
age = int(variables.get('userAge', 0))
```

**DON'T**:
```python
# Risky - may raise KeyError
name = variables['userName']  # If userName doesn't exist

# Unsafe conversion
age = int(variables['userAge'])  # If userAge is not a number
```

### Performance

**DO**:
- Keep code execution fast (< 100ms)
- Avoid complex loops over large data
- Use efficient algorithms
- Return quickly

**DON'T**:
- Create infinite loops
- Process large datasets
- Perform slow operations
- Block execution

---

## Error Handling

### Error Output Port

Route the conversation when code fails:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - Syntax errors in code
    - Runtime exceptions
    - Type errors
    - Division by zero
    - Missing variables

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   Sorry, we encountered an issue processing your request.
   ```

### Admin Email Notification

Get notified when code fails:

1. Toggle **"Admin email when error"** to ON
2. Notifications sent to your registered admin email
3. Includes full traceback for debugging

---

## Security & Limitations

### What's Allowed

- **Basic Python syntax**: if/else, for loops, functions
- **Safe built-ins**: int, float, str, len, min, max, sum, bool
- **String operations**: split, join, upper, lower, strip, etc.
- **List operations**: append, index, slice
- **Dictionary operations**: get, set, keys, values
- **Pre-imported modules**: `datetime` and `time` modules are available
  - `datetime.date` - Date operations (e.g., `datetime.date.today()`)
  - `datetime.datetime` - Date and time operations (e.g., `datetime.datetime.strptime()`)
  - `datetime.timedelta` - Time differences

### What's NOT Allowed

- **Imports**: No import statements (except pre-imported modules: datetime, time)
- **File operations**: No file read/write
- **Network**: No HTTP requests or socket operations
- **System calls**: No os, sys, subprocess
- **Dangerous functions**: No eval, exec (except internally), compile
- **External libraries**: No numpy, pandas, requests, etc.

### Sandboxed Environment

- Code runs in isolated, restricted environment
- Limited built-in functions only
- No access to file system
- No network access
- Protects against malicious code
- Improved error handling and timeout management
- Enhanced compatibility with production environments (Gunicorn/uWSGI)
- Better error messages for debugging failed executions

---

## Advanced Examples

### Complex Validation

```python
def __custom_fn__(variables):
    email = variables.get('userEmail', '')
    phone = variables.get('userPhone', '')
   
    # Validate email
    email_valid = '@' in email and '.' in email and len(email) > 5
   
    # Validate phone (10 digits)
    phone_digits = ''.join(c for c in phone if c.isdigit())
    phone_valid = len(phone_digits) == 10
   
    # Store validation results
    variables['emailValid'] = email_valid
    variables['phoneValid'] = phone_valid
   
    # Overall validation
    if email_valid and phone_valid:
        return "valid"
    elif not email_valid:
        return "invalid_email"
    else:
        return "invalid_phone"
```

### Data Aggregation

```python
def __custom_fn__(variables):
    # Collect all cart items
    item1_qty = int(variables.get('item1Qty', 0))
    item2_qty = int(variables.get('item2Qty', 0))
    item3_qty = int(variables.get('item3Qty', 0))
   
    # Calculate totals
    total_items = item1_qty + item2_qty + item3_qty
   
    # Calculate costs
    item1_cost = item1_qty * 10.00
    item2_cost = item2_qty * 15.00
    item3_cost = item3_qty * 20.00
   
    subtotal = item1_cost + item2_cost + item3_cost
   
    # Store results
    variables['totalItems'] = total_items
    variables['subtotal'] = round(subtotal, 2)
   
    return total_items
```

### Text Processing

```python
def __custom_fn__(variables):
    user_input = variables.get('userMessage', '')
   
    # Clean and normalize
    cleaned = user_input.strip().lower()
   
    # Extract keywords
    keywords = cleaned.split()
   
    # Categorize
    if any(word in keywords for word in ['urgent', 'emergency', 'asap']):
        priority = 'high'
    elif any(word in keywords for word in ['question', 'help', 'info']):
        priority = 'medium'
    else:
        priority = 'low'
   
    variables['messagePriority'] = priority
    variables['keywordCount'] = len(keywords)
   
    return priority
```

---

## Debugging Tips

### Testing Your Code

1. **Start simple**: Test with basic code first
2. **Add logging**: Use return values to debug
3. **Test edge cases**: Empty values, None, zeros
4. **Error routing**: Connect error port to see failures

### Common Errors

**Error**: `KeyError: 'variableName'`
```python
# Fix: Use .get() with default
value = variables.get('variableName', 'default')
```

**Error**: `ValueError: invalid literal for int()`
```python
# Fix: Validate before converting
value = variables.get('number', '0')
if value.isdigit():
    number = int(value)
else:
    number = 0
```

**Error**: `NameError: name 'something' is not defined`
```python
# Fix: All variables must be accessed via variables dict
# Wrong: x = userName
# Right: x = variables['userName']
```

### Print Debugging

While `print()` is not available, you can debug by:
- Storing intermediate values in variables
- Returning debug information
- Using error messages to trace execution

---

## Best Practices

### Code Structure

**DO**:
```python
def __custom_fn__(variables):
    # Get inputs with defaults
    value1 = variables.get('var1', 0)
    value2 = variables.get('var2', 0)
   
    # Validate
    if value1 < 0 or value2 < 0:
        return "error"
   
    # Calculate
    result = value1 + value2
   
    # Store
    variables['result'] = result
   
    # Return
    return result
```

**DON'T**:
```python
def __custom_fn__(variables):
    # No error handling
    result = variables['var1'] + variables['var2']  # May crash
    return result
```

### Variable Handling

**DO**:
- Use `.get()` with defaults for optional variables
- Validate variable types before operations
- Handle None and empty values
- Use descriptive variable names

**DON'T**:
- Assume variables exist
- Skip type checking
- Use cryptic variable names
- Modify variables carelessly

### Error Prevention

**DO**:
- Add validation checks
- Handle edge cases
- Use try-except for risky operations
- Test with various inputs

**DON'T**:
- Ignore potential errors
- Use operations that might fail
- Skip input validation

---

## Common Patterns

### Input Validation Pattern

```python
def __custom_fn__(variables):
    user_input = variables.get('userInput', '')
   
    # Validation logic
    is_valid = len(user_input) >= 3 and user_input.isalnum()
   
    variables['isValid'] = is_valid
   
    return "valid" if is_valid else "invalid"
```

**Flow**:
```
QuestionText -> CustomCode (validate)
                |-- "valid" -> Continue
                \-- "invalid" -> Error message -> Ask again
```

### Data Transformation Pattern

```python
def __custom_fn__(variables):
    raw_data = variables.get('rawInput', '')
   
    # Transform
    cleaned = raw_data.strip().upper()
    formatted = cleaned.replace(' ', '_')
   
    # Store
    variables['cleanedData'] = formatted
   
    return formatted
```

### Multi-Field Validation Pattern

```python
def __custom_fn__(variables):
    name = variables.get('userName', '')
    email = variables.get('userEmail', '')
    phone = variables.get('userPhone', '')
   
    # Validate each
    name_valid = len(name) >= 2
    email_valid = '@' in email and '.' in email
    phone_valid = len(phone) >= 10
   
    # Store individual results
    variables['nameValid'] = name_valid
    variables['emailValid'] = email_valid
    variables['phoneValid'] = phone_valid
   
    # Overall result
    if name_valid and email_valid and phone_valid:
        return "all_valid"
    else:
        return "validation_failed"
```

---

## Error Handling

### Error Output Port

Route the conversation when code fails:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - Syntax errors in Python code
    - Runtime exceptions
    - Type conversion errors
    - Logic errors

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   Sorry, we encountered an issue. Please contact support.
   ```

**Note**: Don't reveal technical error details to users.

### Admin Email Notification

Get notified when code fails:

1. Toggle **"Admin email when error"** to ON
2. Notifications include:
   - Full error traceback
   - Variable values
   - Component ID
   - Timestamp

---

## Technical Details

### Execution Environment

- **Python version**: 3.12+
- **Execution**: Synchronous, isolated process
- **Timeout**: 5 seconds max (with improved timeout handling)
- **Memory**: Limited to prevent abuse
- **Safety**: Sandboxed execution in separate process
- **Error handling**: Enhanced error messages and logging for debugging
- **Production ready**: Optimized for WSGI servers (Gunicorn/uWSGI)

### Function Requirements

```python
def __custom_fn__(variables):
    # Required signature
    # Must accept 'variables' parameter
    # Must return a value
    pass
```

**Required**:
- Function must be named `__custom_fn__`
- Must accept one parameter: `variables`
- Must return a value (any type)

**Optional**:
- Can modify variables dictionary
- Can perform multiple operations
- Can have multiple return statements

### Allowed Operations

**Supported**:
- Arithmetic: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `and`, `or`, `not`
- String methods: `.upper()`, `.lower()`, `.split()`, `.join()`, etc.
- List operations: `append`, `extend`, slicing
- Dictionary operations: `get`, `set`, `keys`, `values`

**Not supported**:
- Imports
- Lambda functions
- Generators
- Decorators
- Classes (beyond basic usage)

---

## Troubleshooting

### Issue: "must define __custom_fn__(variables)"

**Solution**:
```python
# Correct structure
def __custom_fn__(variables):
    return "result"

# Wrong - different function name
def my_function(variables):  # Won't work
    return "result"
```

### Issue: "Variable not found" error

**Solution**:
Use `.get()` with defaults:
```python
# Safe
value = variables.get('varName', 'default')

# Unsafe - crashes if varName doesn't exist
value = variables['varName']
```

### Issue: Code execution times out

**Check**:
- No infinite loops
- Loops are bounded
- Operations complete quickly
- No heavy computations

### Issue: Return value not routing correctly

**Check**:
- Return value matches output port label exactly
- Return value is converted to string for routing
- All possible return values have connected ports
- Default port is connected

### Issue: Variables not updating

**Check**:
- You're modifying `variables` dict correctly
- Variable names are valid
- Changes are made before return statement
- No syntax errors in assignment

---

## When NOT to Use CustomCode

**Consider alternatives when**:

- **Simple calculations**: Use Formula component instead
- **API calls**: Use APIRequest component instead
- **Text manipulation**: Use Formula with ToString
- **Comparisons**: Use Formula True/False mode
- **Email sending**: Use Email component instead

CustomCode is powerful but should be used when built-in components can't handle your needs.

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: January 2025

