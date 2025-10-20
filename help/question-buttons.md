# QuestionButtons Component - User Guide

## Overview

The **QuestionButtons** component allows users to make quick selections by tapping on interactive buttons. Perfect for yes/no questions, multiple choice options, menu selections, and any scenario where you want to guide users with predefined choices.

## When to Use QuestionButtons

Ideal for scenarios like:
- Yes/No questions
- Multiple choice selections
- Menu options (up to 3 choices)
- Quick confirmations
- Simple decision points
- Service or product selection

---

## Configuration

### Adding Buttons

Each QuestionButtons component can have **up to 3 buttons**:

1. **Edit button labels**: Double-click on the button text in the component
2. **Maximum 20 characters** per button label
3. **Connect arrows**: Each button can lead to a different flow path
4. **Use variables**: Button labels support dynamic variables

**Example Labels**:
```
"Yes"
"No"
"Maybe Later"
```

```
"Small"
"Medium"
"Large"
```

### Button Label Variables

Use dynamic text in your button labels:

```
"Option A"
"Option B ({price})"
"Select {productName}"
```

**Note**: Labels are automatically truncated to 20 characters if too long.

### Store User Selection

Save which button the user clicked:

1. In **"Store output in variable"**, enter a variable name:
   ```
   Example: userChoice
   Example: productSize
   Example: confirmationResponse
   ```

2. The variable will store the **button label text** that was clicked

### Add Image

Enhance your question with a visual header:

1. Click **"Add Image"**
2. Upload an image (max 5 MB)
3. Image appears above your question and buttons
4. Helps provide visual context

---

## How It Works

### User Experience

1. **Bot sends**: Question text with buttons below
2. **User**: Taps one of the buttons
3. **QuestionButtons**: Captures which button was clicked
4. **Flow**: Routes to the path connected to that button
5. **Result**: Button label stored in your variable

### WhatsApp Display

Buttons appear as:
```
+---------------------+
|  Your Question Text  |
+---------------------+
|  [  Button One  ]   |
|  [  Button Two  ]   |
|  [ Button Three ]   |
+---------------------+
```

---

## Use Cases & Examples

### 1. Yes/No Question

**Configuration**:
- Message: "Would you like to receive our newsletter?"
- Button 1: "Yes, sign me up"
- Button 2: "No, thanks"
- Variable: `newsletterChoice`

**Flow routing**:
```
"Yes" button -> Newsletter signup flow
"No" button -> Main menu
```

### 2. Product Size Selection

**Configuration**:
- Message: "What size would you like?"
- Button 1: "Small"
- Button 2: "Medium"
- Button 3: "Large"
- Variable: `productSize`

### 3. Customer Service Menu

**Configuration**:
- Message: "How can we help you today?"
- Button 1: "Track Order"
- Button 2: "Make Return"
- Button 3: "Contact Support"
- Variable: `serviceChoice`

**Each button** routes to a different service flow.

### 4. Confirmation Dialog

**Configuration**:
- Message: "Are you sure you want to proceed with this order?"
- Button 1: "Yes, confirm"
- Button 2: "Cancel"
- Variable: `orderConfirmation`

---

## Button Routing

### Connecting Button Outputs

Each button creates its own output port:

1. **Add buttons** to your component (they appear as output arrows)
2. **Connect each button** to its destination:
   - Drag from button's output port
   - Connect to next component
3. **Label the connection** with the button index (0, 1, 2)

### Button Order

Buttons appear top to bottom in the order they're defined:
- First button (index 0) = Top
- Second button (index 1) = Middle
- Third button (index 2) = Bottom

### Dynamic Routing

You can route users to different paths based on their selection:

```
QuestionButtons
|-- Button 1 -> Path A
|-- Button 2 -> Path B
\-- Button 3 -> Path C
```

---

## Best Practices

### Button Design

**DO**:
- Use clear, action-oriented labels
- Keep labels concise (under 15 characters ideal)
- Make options mutually exclusive
- Order buttons logically (e.g., Yes before No)

**DON'T**:
- Use vague labels ("Option 1", "Click here")
- Exceed 20 characters (will be truncated)
- Use empty labels
- Create similar-sounding options

### Question Clarity

**DO**:
- Ask one question at a time
- Provide clear context
- Use simple language
- Match button labels to the question

**DON'T**:
- Ask multiple questions in one component
- Use complex or technical language
- Leave questions ambiguous

### Number of Buttons

**DO**:
- Use 2 buttons for binary choices (Yes/No)
- Use 3 buttons for multiple options
- Consider QuestionList for more than 3 options

**DON'T**:
- Try to add more than 3 buttons (use QuestionList instead)
- Use buttons when text input is more appropriate

---

## Technical Details

### Button Limitations

- **Maximum buttons**: 3
- **Maximum label length**: 20 characters
- **Minimum buttons**: 1
- **Label truncation**: Automatic if over 20 characters

### Variable Storage

When a user clicks a button:
- **Variable stores**: The button label text (as clicked)
- **Type**: String
- **Variables resolved**: If button has {variables}, the resolved value is stored

### WhatsApp Message Format

Buttons are sent as:
- **Message type**: Interactive button message
- **Header**: Optional image
- **Body**: Your question text (max 1024 characters)
- **Buttons**: Up to 3 reply buttons
- **Footer**: Empty (reserved for future use)

---

## Common Patterns

### Binary Decision

```
QuestionButtons (2 buttons)
|-- "Yes" -> Success flow
\-- "No" -> Alternative flow
```

### Service Menu

```
QuestionButtons (3 options)
|-- "Option A" -> Service A flow
|-- "Option B" -> Service B flow
\-- "Option C" -> Service C flow
```

### Confirmation Loop

```
Show Details -> QuestionButtons ("Confirm" / "Edit")
                |-- "Confirm" -> Process
                \-- "Edit" -> Go back to edit
```

### Progressive Options

```
Main Menu (QuestionButtons) -> Sub Menu (QuestionButtons) -> Action
```

---

## Troubleshooting

### Issue: Buttons not appearing

**Check**:
- Button labels are not empty
- Message text is configured
- Component is properly connected in flow

### Issue: Button leads to wrong destination

**Solution**:
- Verify arrow connections in the visual editor
- Check that the correct button port is connected
- Test the flow to confirm routing

### Issue: Button text truncated

**Solution**:
- Keep labels under 20 characters
- Use abbreviations if needed
- Rephrase for brevity

### Issue: Variable not storing

**Check**:
- Variable name is properly configured
- User actually clicked a button
- Variable name is valid (no spaces or special characters)

---

## Comparison with Other Components

### When to Use Buttons vs List

**Use QuestionButtons when**:
- You have 2-3 options
- Options are simple choices
- You want maximum visibility

**Use QuestionList when**:
- You have 4-10 options
- Options are longer descriptions
- You want to save screen space

### When to Use Buttons vs Text

**Use QuestionButtons when**:
- You want to constrain user choices
- Options are predefined
- You need structured data

**Use QuestionText when**:
- You need open-ended responses
- Input varies by user
- No predefined options exist

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: October 20, 2025

