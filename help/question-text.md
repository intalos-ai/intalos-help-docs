# QuestionText Component

## Overview

The **QuestionText** component allows you to ask users open-ended questions and collect their text responses. Perfect for gathering names, addresses, descriptions, feedback, and any other free-form text input.

## When to Use QuestionText

Ideal for scenarios like:
- Collecting user names or contact information
- Asking for addresses or locations
- Gathering feedback or comments
- Getting detailed descriptions
- Open-ended survey questions
- Custom text input requirements

---

## Configuration

### Store User Response

The text entered by the user can be saved to a variable for later use:

1. In **"Store output in variable"**, enter a variable name:
   ```
   Example: userName
   Example: userAddress
   Example: feedbackText
   ```

2. Use this variable later in your flow:
   ```
   Thank you {userName} for your feedback!
   ```

### Auto Transition Mode

Toggle **"Auto transition"** to ON when you want to:
- Display a message without waiting for user input
- Automatically move to the next step
- Show information or instructions

When enabled:
- No user input is collected
- Flow immediately transitions to next component
- Variable storage is disabled
- Use for informational messages

### Navigation Buttons

Add quick navigation options for better user experience:

#### Go Back Button
1. Toggle **"Go Back"** to ON
2. Customize label (max 20 characters):
   ```
   Default: "Go Back"
   Custom: "Previous Step"
   ```
3. Allows users to return to previous step

#### Go On Button
1. Toggle **"Go On"** to ON
2. Customize label (max 20 characters):
   ```
   Default: "Go On"
   Custom: "Continue"
   Custom: "Next"
   ```
3. Allows users to proceed without typing

**Note**: Navigation buttons are only available when auto-transition is OFF.

### Input Validation

Validate user input to ensure correct format and data quality:

1. **Enable Validation**: Toggle **"Input validation"** to ON
2. **Select Validation Type**:
   - **Number**: Validates numeric input
   - **Email**: Validates email format
   - **Date**: Validates date in specified format
   - **Regular Expression**: Custom pattern matching
3. **Configure Validation**:
   - For **Date**: Choose preset format or enter custom Python strptime format
   - For **Regex**: Enter your regex pattern (e.g., `^[A-Za-z]+$`)
   - **Custom Error Message**: Optional custom message (default includes format info)
4. **Length Limit** (Optional):
   - Toggle **"Input length limit"** to ON
   - Set maximum character count
   - Prevents overly long responses

**Example Configurations**:
- **Email Collection**: Validation Type = Email
- **Phone Number**: Validation Type = Regex, Pattern = `^[0-9]{10}$`
- **Birth Date**: Validation Type = Date, Format = DD/MM/YYYY
- **Short Answer**: Validation Type = Number, Max Length = 3

### Add Image

Enhance your question with a visual element:

1. Click **"Add Image"**
2. Upload an image (max 5 MB)
3. Image appears above your question text
4. Helps provide context or visual instructions

**Good for**:
- Showing examples
- Visual instructions
- Product images
- Reference materials

---

## How It Works

### User Experience

1. **Bot asks**: "What is your name?"
2. **User**: Types their response
3. **QuestionText**: Captures and stores the response
4. **Result**: Text stored in your variable for later use

### Message Length Limits

- **WhatsApp limit**: 1024 characters for outgoing messages
- **User input**: No limit on incoming text length
- Messages exceeding 1024 characters will be automatically truncated with "..."

---

## Use Cases & Examples

### 1. Name Collection

**Configuration**:
- Message: "What is your full name?"
- Variable: `userName`
- Go On: OFF

**User flow**:
```
Bot: What is your full name?
User: John Smith
-> Stored in {userName}
```

### 2. Address Collection

**Configuration**:
- Message: "Please enter your delivery address"
- Variable: `deliveryAddress`
- Go On: OFF

### 3. Feedback Collection

**Configuration**:
- Message: "How was your experience with our service?"
- Variable: `userFeedback`
- Go On: ON ("Skip")

Allows users to skip if they don't want to provide feedback.

### 4. Information Display (Auto-Transition)

**Configuration**:
- Message: "Thank you! Processing your request..."
- Auto transition: ON
- Variable: (disabled)

Simply displays the message and moves on automatically.

### 5. Email Collection with Validation

**Configuration**:
- Message: "Please enter your email address"
- Variable: `userEmail`
- Input validation: ON
- Validation type: Email
- Go On: OFF

Ensures users provide a valid email format.

### 6. Date Collection with Format Validation

**Configuration**:
- Message: "Please enter your date of birth (DD/MM/YYYY)"
- Variable: `userBirthDate`
- Input validation: ON
- Validation type: Date
- Date format: DD/MM/YYYY
- Go On: OFF

Validates date input matches the specified format.

### 7. Phone Number with Regex Validation

**Configuration**:
- Message: "Enter your 10-digit phone number"
- Variable: `userPhone`
- Input validation: ON
- Validation type: Regular Expression
- Regex pattern: `^[0-9]{10}$`
- Go On: OFF

Ensures exactly 10 digits are entered.

---

## Best Practices

### Message Clarity

**DO**:
- Ask clear, specific questions
- Use simple language
- Provide examples when helpful
- Explain what format you need

**DON'T**:
- Ask vague or ambiguous questions
- Use technical jargon
- Assume users know what to enter

### Examples

**Good**:
```
"Please enter your email address (example: john@example.com)"
"What is your phone number? (10 digits, no spaces)"
"Describe the issue in a few sentences"
```

**Bad**:
```
"Enter details"
"Provide information"
"Input data"
```

### Variable Naming

**DO**:
- Use descriptive variable names (`userName`, `customerEmail`)
- Use camelCase for consistency
- Keep names concise but meaningful

**DON'T**:
- Use generic names (`var1`, `temp`, `x`)
- Include spaces or special characters
- Use reserved keywords

### Navigation Buttons

**DO**:
- Use "Go Back" for returning to previous steps
- Use "Go On" or "Skip" for optional questions
- Keep button labels under 20 characters
- Use clear, action-oriented labels

**DON'T**:
- Use long descriptive labels (they'll be truncated)
- Leave labels empty
- Use confusing button text

---

## Technical Details

### Input Validation

The QuestionText component supports built-in input validation to ensure users provide data in the correct format. Enable validation by toggling **"Input validation"** to ON.

#### Validation Types

1. **Number Validation**
   - Validates that input is a valid number (integer or decimal)
   - Examples: `42`, `3.14`, `-10`, `0.5`
   - Rejects: `abc`, `12abc`, `12.34.56`

2. **Email Validation**
   - Validates email address format
   - Examples: `user@example.com`, `test.email+tag@domain.co.uk`
   - Standard email format validation

3. **Date Validation**
   - Validates date input in specified format
   - **Preset Formats**:
     - `YYYY-MM-DD` (e.g., 2024-12-25)
     - `DD/MM/YYYY` (e.g., 25/12/2024)
     - `MM/DD/YYYY` (e.g., 12/25/2024)
     - `DD-MM-YYYY` (e.g., 25-12-2024)
     - `YYYY/MM/DD` (e.g., 2024/12/25)
     - `DD.MM.YYYY` (e.g., 25.12.2024)
   - **Custom Format**: Use Python `strptime` format codes
     - `%Y` for year (4 digits)
     - `%m` for month (01-12)
     - `%d` for day (01-31)
     - Example: `%Y-%m-%d` for `2024-12-25`
   - Error message includes the expected format in brackets

4. **Regular Expression (Regex) Validation**
   - Custom pattern matching using regex
   - Enter your regex pattern in the "Regex Pattern" field
   - Examples:
     - `^[A-Za-z]+$` - Only letters
     - `^[0-9]{10}$` - Exactly 10 digits
     - `^[A-Za-z0-9]+$` - Alphanumeric only

#### Maximum Length Validation

Enable **"Input length limit"** to restrict the number of characters:
- Set maximum length (e.g., 50, 100, 255)
- Users cannot submit responses exceeding the limit
- Error message indicates the maximum allowed length

#### Custom Error Messages

You can customize the validation error message:
- Leave empty to use default messages
- Default messages include format information (e.g., "Please enter a valid date in the required format (DD/MM/YYYY).")
- Custom messages override defaults

#### Validation Behavior

- Validation occurs when user submits input
- Invalid input shows error message to user
- User must correct input before proceeding
- Valid input proceeds to next component
- Stores raw user input in the variable (after validation passes)
- Trims whitespace from responses

### WhatsApp Limitations

- **Outgoing message limit**: 1024 characters
- **User input**: No character limit
- **Button labels**: Maximum 20 characters
- **Variable names**: Must be valid identifiers

### Variable Storage

User responses are stored as:
- **Type**: String
- **Encoding**: UTF-8
- **Whitespace**: Leading/trailing whitespace removed
- **Empty responses**: Stored as empty string

---

## Common Patterns

### Sequential Questions

Use multiple QuestionText components in sequence:
```
QuestionText (name) -> QuestionText (email) -> QuestionText (phone)
```

### Optional Questions with Skip

Enable "Go On" button for optional questions:
```
Message: "Any additional comments? (Optional)"
Go On: "Skip"
```

### Confirmation Flow

Collect input, then confirm:
```
QuestionText (collect) -> Text (confirm: "You entered: {userInput}")
```

### Validation Pattern

Collect input, validate, retry if invalid:
```
QuestionText -> Formula (validate) -> (valid) Success
                                   -> (invalid) Error message -> back to QuestionText
```

---

## Troubleshooting

### Issue: Users send wrong format

**Solution**: Provide clear examples and format instructions in your question

### Issue: Variable not storing

**Check**:
- Variable name is properly configured
- Auto-transition is OFF
- Component is properly connected in flow

### Issue: Message too long

**Solution**:
- Keep questions concise
- Split long messages into multiple Text components
- Use variables to reduce repetition

### Issue: Navigation buttons not working

**Check**:
- Auto-transition is OFF
- Flow has valid previous/next states
- Button labels are under 20 characters

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: January 2025

