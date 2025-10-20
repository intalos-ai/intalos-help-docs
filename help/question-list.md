# QuestionList Component - User Guide

## Overview

The **QuestionList** component allows users to select from a dropdown list of options. Perfect for when you have 4-10 choices and want a compact, organized selection interface.

## When to Use QuestionList

Ideal for scenarios like:
- Product category selection
- Country or city selection
- Service type selection
- Time slot selection
- Department routing
- Multi-option menus (4-10 choices)

---

## Configuration

### Adding List Options

Each QuestionList component can have **up to 10 options**:

1. **Edit option labels**: Double-click on the option text in the component
2. **Maximum 20 characters** per option label
3. **Connect arrows**: Each option can lead to a different flow path
4. **Use variables**: Option labels support dynamic variables

**Example Options**:
```
"Electronics"
"Clothing"
"Home & Garden"
"Sports Equipment"
```

### Option Label Variables

Use dynamic text in your option labels:

```
"Product A ({priceA})"
"Service: {serviceName}"
"Option {optionNumber}"
```

**Note**: Labels are automatically truncated to 20 characters if too long.

### Store User Selection

Save which option the user selected:

1. In **"Store output in variable"**, enter a variable name:
   ```
   Example: selectedCategory
   Example: chosenService
   Example: userSelection
   ```

2. The variable will store the **option label text** that was selected

### Add Image

Enhance your question with a visual header:

1. Click **"Add Image"**
2. Upload an image (max 5 MB)
3. Image appears above your question and list
4. Helps provide visual context

---

## How It Works

### User Experience

1. **Bot sends**: Question text with a "Select an option" button
2. **User**: Taps the button to open the dropdown list
3. **User**: Scrolls and selects an option
4. **QuestionList**: Captures which option was selected
5. **Flow**: Routes to the path connected to that option
6. **Result**: Option label stored in your variable

### WhatsApp Display

List appears as:
```
+----------------------+
|  Your Question Text   |
|                       |
| [ Select an option v ]|
+----------------------+

When tapped:
+----------------------+
| [x] Option 1         |
| [ ] Option 2         |
| [ ] Option 3         |
| [ ] Option 4         |
| [ ] Option 5         |
+----------------------+
```

---

## Use Cases & Examples

### 1. Product Category Selection

**Configuration**:
- Message: "Which category are you interested in?"
- Options:
  - "Electronics"
  - "Clothing"
  - "Home & Garden"
  - "Sports"
  - "Books"
- Variable: `selectedCategory`

**Flow routing**:
```
Each option -> Different product catalog flow
```

### 2. Support Department Routing

**Configuration**:
- Message: "Which department would you like to contact?"
- Options:
  - "Sales"
  - "Technical Support"
  - "Billing"
  - "Returns"
  - "General Inquiry"
- Variable: `department`

### 3. Time Slot Selection

**Configuration**:
- Message: "Select your preferred appointment time:"
- Options:
  - "9:00 AM - 10:00 AM"
  - "10:00 AM - 11:00 AM"
  - "11:00 AM - 12:00 PM"
  - "1:00 PM - 2:00 PM"
  - "2:00 PM - 3:00 PM"
- Variable: `appointmentTime`

### 4. Country Selection

**Configuration**:
- Message: "Which country are you from?"
- Options:
  - "United States"
  - "United Kingdom"
  - "Canada"
  - "Australia"
  - "Other"
- Variable: `userCountry`

---

## List Routing

### Connecting Option Outputs

Each option creates its own output port:

1. **Add options** to your component (they appear as output arrows)
2. **Connect each option** to its destination:
   - Drag from option's output port
   - Connect to next component
3. **Label the connection** with the option index (0, 1, 2, ...)

### Option Order

Options appear in the dropdown in the order they're defined:
- First option (index 0) = Top of list
- Last option = Bottom of list

### Default Option Routing

You can also add a default path that catches any unhandled selections.

---

## Best Practices

### Option Design

**DO**:
- Use clear, descriptive labels
- Keep labels concise (under 15 characters ideal)
- Make options mutually exclusive
- Order options logically (alphabetically or by importance)

**DON'T**:
- Use vague labels ("Option 1", "Choice A")
- Exceed 20 characters (will be truncated)
- Use empty labels
- Create duplicate or similar options

### Question Clarity

**DO**:
- Ask clear, specific questions
- Provide context for the selection
- Use intro text if needed
- Group related options

**DON'T**:
- Ask multiple questions in one component
- Use technical jargon
- Assume users understand options

### Number of Options

**DO**:
- Use 4-10 options for optimal user experience
- Consider grouping options into categories
- Order by frequency of use or importance

**DON'T**:
- Use lists for only 2-3 options (use QuestionButtons instead)
- Exceed 10 options (consider breaking into multiple lists)
- Create unnecessarily long lists

---

## Technical Details

### List Limitations

- **Maximum options**: 10
- **Minimum options**: 1
- **Maximum label length**: 20 characters
- **Button text**: "Select an option" (fixed)
- **Section title**: "Section1" (fixed)

### Variable Storage

When a user selects an option:
- **Variable stores**: The option label text (as displayed)
- **Type**: String  
- **Variables resolved**: If option has {variables}, the resolved value is stored

### WhatsApp Message Format

Lists are sent as:
- **Message type**: Interactive list message
- **Header**: Optional image
- **Body**: Your question text (max 1024 characters)
- **Button**: "Select an option" text
- **Options**: Up to 10 items in one section

---

## Common Patterns

### Category -> Subcategory

```
QuestionList (Main categories)
\--> QuestionList (Subcategories)
    \--> Show products
```

### Location Selection

```
QuestionList (Country)
\--> QuestionList (City)
    \--> QuestionList (Store location)
```

### Preference Collection

```
QuestionList (Industry)
\--> QuestionList (Company size)
    \--> QuestionList (Budget range)
        \--> Personalized recommendations
```

---

## Comparison with Other Components

### QuestionList vs QuestionButtons

| Feature | QuestionButtons | QuestionList |
|---------|----------------|--------------|
| **Max options** | 3 | 10 |
| **Display** | All visible | Dropdown |
| **Best for** | 2-3 simple choices | 4-10 organized options |
| **Screen space** | More space | Compact |
| **User action** | One tap | Two taps (open + select) |

**Use QuestionButtons when**:
- You have 2-3 options
- Options are simple
- You want maximum visibility

**Use QuestionList when**:
- You have 4-10 options
- You want to save screen space
- Options need more context

---

## Troubleshooting

### Issue: List not appearing

**Check**:
- Option labels are not empty
- Message text is configured
- Component is properly connected in flow
- At least one option is defined

### Issue: Option leads to wrong destination

**Solution**:
- Verify arrow connections in the visual editor
- Check that the correct option port is connected
- Test the flow to confirm routing

### Issue: Option text truncated

**Solution**:
- Keep labels under 20 characters
- Use abbreviations if needed
- Rephrase for brevity
- Consider breaking into sub-menus

### Issue: Variable not storing

**Check**:
- Variable name is properly configured
- User actually selected an option
- Variable name is valid (no spaces or special characters)

### Issue: Too many options needed

**Solution**:
- Break into multiple cascading lists (Category -> Subcategory)
- Group related options
- Consider using QuestionText with validation instead

---

## Advanced Tips

### Dynamic Option Labels

Use variables to personalize options:
```
"Plan A ({planAPrice})"
"Plan B ({planBPrice})"
"Plan C ({planCPrice})"
```

### Conditional List Content

Use different QuestionList components based on previous answers:
```
User type -> Business QuestionList
          -> Personal QuestionList
```

### List Chaining

Create drill-down experiences:
```
Region List -> Country List -> City List -> Location confirmation
```

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: October 20, 2025

