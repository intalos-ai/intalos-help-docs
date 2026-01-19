# Formula Component

## Overview

The **Formula** component allows you to perform calculations, comparisons, and logical operations within your bot flow. Perfect for validating user input, calculating prices, routing based on conditions, and performing mathematical operations.

## When to Use Formula

Ideal for scenarios like:
- Price calculations and discounts
- Input validation (age, quantity, etc.)
- Conditional routing based on values
- Mathematical operations
- Data comparisons
- String operations

---

## Calculation Modes

The Formula component has three modes:

### 1. Answer Mode

**Purpose**: Perform calculations and store the result

**Use when**:
- You need to calculate a total, sum, or product
- Converting data types (numbers to strings)
- Performing arithmetic operations

**Available functions**:
- `Sum(a, b)` - Add two numbers
- `Multiply(a, b)` - Multiply two numbers
- `ToString(a)` - Convert value to string
- `Length(value)` - Get the length of an array, string, or other iterable

**Example**:
```
Sum(10, 20)          -> Result: 30
Multiply(5, 4)       -> Result: 20
Sum({quantity}, 5)   -> Result: {quantity} + 5
ToString({orderId})  -> Result: String version of orderId
```

### 2. True/False Mode

**Purpose**: Compare values and route based on result

**Use when**:
- Validating user input
- Checking conditions
- Age verification
- Value comparisons

**Available functions**:
- `IsEqual(a, b)` - Checks if a equals b
- `IsNotEqual(a, b)` - Checks if a does not equal b
- `IsGreaterThan(a, b)` - Checks if a > b
- `IsLessThan(a, b)` - Checks if a < b
- `IsGreaterOrEqual(a, b)` - Checks if a >= b
- `IsLessOrEqual(a, b)` - Checks if a <= b
- `Contains(container, value)` - Checks if value exists in container
- `Length(value)` - Get the length of an array, string, or other iterable

**Example**:
```
IsEqual({userAge}, 18)              -> True if age is 18
IsGreaterThan({orderTotal}, 100)    -> True if total > 100
Contains({userEmail}, "@")          -> True if email has @
```

**Flow routing**:
- **True port** -> Condition met
- **False port** -> Condition not met

### 3. Custom Mode

**Purpose**: Calculate and route based on the result value

**Use when**:
- You need to route to different paths based on calculation result
- Multiple outcomes based on computed value
- Complex decision trees

**Available functions**:
- Same as Answer mode (Sum, Multiply, ToString, Length)

**How it works**:
1. Formula calculates result
2. Result converted to string
3. Flow routes to matching output port
4. Default port used if no match

**Example**:
```
Formula: Sum({itemCount}, {bonusItems})

Output ports:
- "5" -> Small order flow
- "10" -> Medium order flow
- "15" -> Large order flow
- "default" -> Standard flow
```

---

## Configuration

### Store Result in Variable

Save the calculation result:

1. In **"Store output in variable"**, enter a variable name:
   ```
   Example: calculatedTotal
   Example: validationResult
   Example: discountedPrice
   ```

2. Use this variable later in your flow:
   ```
   Your total is ${calculatedTotal}
   ```

### Select Calculation Mode

Choose from the dropdown:
1. **Answer** - Store calculation result
2. **True/False** - Route based on comparison
3. **Custom** - Route based on result value

### Enter Formula

Double-click the formula text in the component to edit:

**Format**: `FunctionName(argument1, argument2)`

**Using variables**: `{variableName}` or nested paths like `{variableName.property}` or `{variableName[0]}`

**Examples**:
```
Sum(10, 5)
Multiply({price}, {quantity})
IsGreaterThan({userAge}, 18)
Contains({userInput}, "yes")
Length({myArray})
IsLessThan(Length({myArray}), 7)
{response.data.items[0].name}
```

---

## How It Works

### Answer Mode Flow

1. **Formula executes**: e.g., `Sum(10, 20)`
2. **Result calculated**: 30
3. **Stored in variable**: `{calculatedTotal} = 30`
4. **Flow continues** to next component

### True/False Mode Flow

1. **Formula executes**: e.g., `IsGreaterThan({age}, 18)`
2. **Condition evaluated**: True or False
3. **Flow routes**:
   - True -> Age verified path
   - False -> Age rejection path

### Custom Mode Flow

1. **Formula executes**: e.g., `Sum({items}, 5)`
2. **Result calculated**: 15
3. **Result converted to string**: "15"
4. **Flow routes** to output port labeled "15" (or default if no match)

---

## Use Cases & Examples

### 1. Calculate Order Total

**Mode**: Answer 
**Formula**: `Sum({subtotal}, {shippingCost})` 
**Variable**: `orderTotal`

**Flow**:
```
Collect items -> Calculate subtotal -> Formula (add shipping) -> Show total
```

### 2. Age Verification

**Mode**: True/False 
**Formula**: `IsGreaterOrEqual({userAge}, 18)`

**Flow**:
```
QuestionText (ask age)
-> Formula (check >= 18)
   |-- True -> Proceed with service
   \-- False -> "Sorry, must be 18+"
```

### 3. Discount Calculator

**Mode**: Answer 
**Formula**: `Multiply({price}, 0.9)` 
**Variable**: `discountedPrice`

**Result**: Applies 10% discount

### 4. Email Validation

**Mode**: True/False 
**Formula**: `Contains({userEmail}, "@")`

**Flow**:
```
QuestionText (email)
-> Formula (check has @)
   |-- True -> Valid email
   \-- False -> "Please enter valid email"
```

### 5. Tiered Pricing

**Mode**: Custom 
**Formula**: `ToString({quantity})`

**Output ports**:
- "1" -> $10 per item
- "5" -> $9 per item
- "10" -> $8 per item
- "default" -> Quote required

### 6. Input Validation Range

**Mode**: True/False 
**Formula**: `IsGreaterThan({quantity}, 0)`

**Combined with**:
```
Formula 1: IsGreaterThan({quantity}, 0)
Formula 2: IsLessThan({quantity}, 100)
```

### 7. Array Length Check

**Mode**: True/False 
**Formula**: `IsLessThan(Length({photoArray}), 7)`

**Flow**:
```
QuestionMedia collects photos
-> Formula (check array length < 7)
   |-- True -> Process photos
   \-- False -> "Maximum 6 photos allowed"
```

### 8. Nested Object Access

**Mode**: Answer 
**Formula**: `{apiResponse.data.items[0].name}`

**Use case**: Access nested data from API responses
```
APIRequest returns: {"data": {"items": [{"name": "Product 1"}]}}
-> Formula extracts: {apiResponse.data.items[0].name}
-> Result: "Product 1"
```

---

## Formula Syntax

### Function Format

```
FunctionName(argument1, argument2)
```

**Rules**:
- Function name is case-sensitive
- Arguments separated by commas
- No spaces in function name
- Variables wrapped in curly braces

### Using Variables

**Simple variables**:
```
Sum({variable1}, {variable2})
IsEqual({userInput}, "yes")
Multiply({price}, {quantity})
```

**Nested paths** (access properties and array elements):
```
{response.data.name}              # Access nested object property
{response.items[0].title}         # Access first array item's property
{user.profile.email}              # Deep nesting supported
{apiResponse.records[0].id}       # Array index access
```

**Variable values**:
- Must exist before Formula runs
- Automatically converted to appropriate type
- Numbers, strings, booleans, arrays, and objects supported
- Nested paths automatically resolved

### Allowed Values

**Numbers**:
```
Sum(10, 20)
Multiply(5.5, 2)
IsGreaterThan(100, 50)
```

**Strings**:
```
IsEqual({userName}, "John")
Contains({userInput}, "yes")
ToString(12345)
```

**Variables**:
```
Sum({var1}, {var2})
IsEqual({userChoice}, {expectedValue})
```

---

## Available Functions Reference

### Mathematical Functions (Answer & Custom modes)

| Function | Arguments | Returns | Example |
|----------|-----------|---------|---------|
| `Sum(a, b)` | 2 numbers | Number | `Sum(10, 5)` -> 15 |
| `Multiply(a, b)` | 2 numbers | Number | `Multiply(3, 4)` -> 12 |
| `ToString(a)` | Any value | String | `ToString(123)` -> "123" |
| `Length(value)` | Array, string, or iterable | Number | `Length({myArray})` -> 5 |

### Comparison Functions (True/False mode)

| Function | Arguments | Returns | Example |
|----------|-----------|---------|---------|
| `IsEqual(a, b)` | 2 values | Boolean | `IsEqual(5, 5)` -> True |
| `IsNotEqual(a, b)` | 2 values | Boolean | `IsNotEqual(5, 3)` -> True |
| `IsGreaterThan(a, b)` | 2 numbers | Boolean | `IsGreaterThan(10, 5)` -> True |
| `IsLessThan(a, b)` | 2 numbers | Boolean | `IsLessThan(5, 10)` -> True |
| `IsGreaterOrEqual(a, b)` | 2 numbers | Boolean | `IsGreaterOrEqual(5, 5)` -> True |
| `IsLessOrEqual(a, b)` | 2 numbers | Boolean | `IsLessOrEqual(3, 5)` -> True |
| `Contains(container, value)` | String, String | Boolean | `Contains("hello", "ell")` -> True |
| `Length(value)` | Array, string, or iterable | Number | `Length({myArray})` -> 5 |

---

## Best Practices

### Formula Design

**DO**:
- Keep formulas simple and focused
- Use descriptive variable names
- Test with different input values
- Document complex formulas

**DON'T**:
- Create overly complex calculations
- Use undefined variables
- Perform calculations that could cause errors (divide by zero)
- Access non-existent nested paths (will keep placeholder)

### Variable Usage

**DO**:
- Ensure variables exist before using in formulas
- Use appropriate data types (numbers for math)
- Validate user input before calculations
- Handle edge cases (empty values, zero, negatives)

**DON'T**:
- Assume variables have values
- Mix incompatible types without conversion
- Use variables that might be undefined

### Routing Logic

**DO**:
- Use True/False mode for binary decisions
- Use Custom mode for multiple outcomes
- Provide default paths for unmatched results
- Test all possible routes

**DON'T**:
- Create unreachable paths
- Forget to connect all output ports
- Create circular logic loops

---

## Error Handling

### Error Output Port

Route the conversation when formula fails:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - Invalid formula syntax
    - Undefined variables
    - Type mismatches
    - Calculation errors

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   Sorry, we couldn't process that. Please try again.
   ```

### Admin Email Notification

Get notified when errors occur:

1. Toggle **"Admin email when error"** to ON
2. Notifications sent to your registered admin email
3. Includes error details and formula

---

## Technical Details

### Execution

- **Processing**: Synchronous (immediate)
- **Variables**: Replaced before calculation
- **Type conversion**: Automatic where possible
- **Error handling**: Catches exceptions and routes to error port

### Security

- **Sandboxed execution**: Only allowed functions can run
- **No arbitrary code**: AST parsing prevents injection
- **Function whitelist**: Only pre-defined functions available
- **Safe evaluation**: No eval() or exec() used

### Limitations

- **No nested functions**: `Sum(Multiply(2, 3), 5)` not supported
- **Two arguments max**: Functions limited to 2 parameters
- **No variables in function names**: Function name must be literal
- **Constants only after substitution**: Variables resolved to constants before evaluation

---

## Common Patterns

### Multi-Step Validation

```
QuestionText (age)
-> Formula (IsGreaterOrEqual({age}, 18))
   |-- True -> Formula (IsLessThan({age}, 65))
   |         |-- True -> Eligible
   |         \-- False -> Senior category
   \-- False -> "Must be 18+"
```

### Dynamic Pricing

```
Select quantity
-> Formula (Multiply({quantity}, {pricePerItem}))
   -> Store in {subtotal}
      -> Formula (Sum({subtotal}, {shippingFee}))
         -> Store in {total}
            -> Show total
```

### Input Range Validation

```
QuestionText (enter number)
-> Formula (IsGreaterThan({number}, 0))
   |-- True -> Formula (IsLessThan({number}, 100))
   |         |-- True -> Valid range
   |         \-- False -> "Too high"
   \-- False -> "Must be positive"
```

### Conditional Flow Routing

```
Calculate score
-> Formula Custom (Sum({quiz1}, {quiz2}))
   |-- "10" -> Perfect score flow
   |-- "8" -> High score flow
   |-- "5" -> Medium score flow
   \-- default -> Low score flow
```

---

## Troubleshooting

### Issue: Formula syntax error

**Check**:
- Function name is spelled correctly (case-sensitive)
- Parentheses are balanced
- Arguments are separated by comma
- No spaces in function name

**Good**: `Sum(10, 5)` 
**Bad**: `sum(10,5)`, `Sum (10, 5)`, `Sum(10 5)`

### Issue: Variables not found

**Check**:
- Variable name matches exactly (case-sensitive)
- Variable was created in previous component
- Variable has a value
- Syntax: `{variableName}` with curly braces

### Issue: Wrong result type

**Solution**:
- Use `ToString()` to convert numbers to strings
- Ensure variables are the right type for the operation
- Check that comparison functions get comparable values

### Issue: Custom mode routing fails

**Check**:
- Output port labels match possible results exactly
- Default port is connected
- Result is converted to string for matching
- Test with all possible values

### Issue: Calculation returns error

**Check**:
- Arguments are valid numbers (for math functions)
- No division by zero scenarios
- Variables are defined and not empty
- Function arguments are correct type

---

## Advanced Tips

### Chaining Formulas

Perform complex calculations by chaining multiple Formula components:

```
Formula 1: Sum({price}, {tax})
  -> Store in {priceWithTax}
     -> Formula 2: Multiply({priceWithTax}, {quantity})
        -> Store in {totalCost}
```

### Validation Patterns

**Email validation**:
```
Contains({email}, "@")
```

**Numeric range**:
```
IsGreaterOrEqual({value}, {min}) AND IsLessOrEqual({value}, {max})
(Use two Formula components)
```

**String matching**:
```
IsEqual({userResponse}, "yes")
```

### Dynamic Calculations

Use variables from previous components:
```
APIRequest (get price from API)
-> Store in {apiPrice}
   -> Formula (Multiply({apiPrice}, {quantity}))
      -> Store in {total}
```

---

## Comparison with Other Components

### Formula vs CustomCode

**Use Formula when**:
- Simple calculations needed
- Standard operations (Sum, Multiply, comparisons)
- Want visual, no-code solution
- Need basic validation

**Use CustomCode when**:
- Complex logic required
- Need advanced Python operations
- Custom algorithms
- Multiple operations in one component

### Formula vs APIRequest

**Use Formula when**:
- Calculations can be done locally
- No external data needed
- Immediate results required

**Use APIRequest when**:
- Need to fetch external data
- Complex calculations better on server
- Need third-party validation

---

## Examples by Use Case

### Price Calculation

```
Quantity: 5
Price per item: $10

Formula: Multiply(10, {quantity})
Variable: totalPrice
Result: $50
```

### Age Gate

```
User enters age: 25

Formula: IsGreaterOrEqual({userAge}, 21)
Routes to:
|-- True -> Show alcohol products
\-- False -> Show non-alcohol products
```

### Discount Tier

```
Order total: $250

Formula Custom: ToString({orderTotal})
Routes:
|-- "100" -> 5% discount
|-- "200" -> 10% discount
|-- "500" -> 20% discount
\-- default -> No discount
```

### Input Validation

```
User enters quantity: 150

Formula: IsLessThan({quantity}, 100)
Routes to:
|-- True -> Process order
\-- False -> "Maximum 99 items per order"
```

---

## Error Handling

### Error Output Port

Route the conversation when formula fails:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - Invalid formula syntax
    - Undefined variables
    - Type errors
    - Calculation failures

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   Sorry, we couldn't process that value. Please try again.
   ```

### Admin Email Notification

Get notified when errors occur:

1. Toggle **"Admin email when error"** to ON
2. Notifications sent to your registered admin email
3. Includes error details and formula

---

## Technical Details

### Formula Execution

- **Parser**: Abstract Syntax Tree (AST)
- **Safety**: Sandboxed execution
- **Variable replacement**: Before evaluation
- **Type handling**: Automatic conversion where possible

### Supported Data Types

**Numbers**:
- Integers: `10`, `100`, `{quantity}`
- Decimals: `10.5`, `{price}`
- Negative: `-5`, `{discount}`

**Strings**:
- Text: `"hello"`, `{userName}`
- Empty: `""`
- With variables: `{userInput}`

**Booleans**:
- True/False results from comparisons
- Stored as boolean values

### Limitations

- **Two arguments maximum** per function
- **Nested function calls supported**: `Length({myArray})`, `IsLessThan(Length({myArray}), 7)`
- **No custom functions**: Only predefined functions allowed
- **No loops or conditionals**: Use separate components for complex logic
- **Nested paths**: Automatically resolved, invalid paths keep placeholder

---

## Security

### Safe Execution

The Formula component:
- Uses AST parsing (not eval())
- Whitelisted functions only
- No arbitrary code execution
- Sandboxed environment

### What's NOT Allowed

- Custom function definitions
- Import statements
- File system access
- Network requests
- Variable assignments (except output variable)

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: January 2025

