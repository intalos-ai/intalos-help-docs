# Time Delay Component

## Overview

The **Time Delay** component allows you to pause the bot flow for a specified duration before proceeding to the next step. This is useful for creating natural conversation pacing, simulating processing time, or ensuring proper timing between operations.

## When to Use Time Delay

Ideal for scenarios like:
- Creating natural conversation pacing
- Simulating processing time for user feedback
- Ensuring proper timing between API calls
- Adding delays before sending multiple messages
- Creating a sense of "thinking" time for the bot

---

## Configuration

### Adding Time Delay to Your Flow

1. Click the **"Time Delay"** button in the component stencil
2. The component will appear in your diagram
3. Connect it between other components where you need a pause

### Setting the Delay Duration

1. **Select the Time Delay component** in your diagram
2. **Open the Inspector panel** (right side)
3. **Choose the delay duration**:
   - **0.5 seconds** - Short pause, ideal for quick acknowledgments
   - **1 second** - Standard pause, good for most use cases

4. **The delay is automatically applied** when the bot reaches this component

---

## How It Works

When the bot flow reaches a Time Delay component:
1. The bot pauses execution for the selected duration
2. A log entry is recorded showing the delay execution
3. After the delay completes, the bot continues to the next component

**Important**: The delay is synchronous - the bot will wait for the full duration before proceeding.

---

## Common Use Cases

### 1. Natural Conversation Pacing

**Scenario**: You want to add a pause between messages to make the conversation feel more natural.

**Flow**:
```
QuestionText → Time Delay (0.5s) → Media → Time Delay (1s) → QuestionButtons
```

**Result**: 
- User sends a message
- Bot waits 0.5 seconds
- Bot sends an image
- Bot waits 1 second
- Bot asks for button selection

### 2. Processing Time Simulation

**Scenario**: You want users to feel like the bot is "processing" their request.

**Flow**:
```
QuestionText → Time Delay (1s) → Formula → Media (showing results)
```

**Result**:
- User submits information
- Bot pauses 1 second (simulating processing)
- Bot calculates result
- Bot displays result with an image

### 3. Multiple Message Spacing

**Scenario**: You want to send multiple messages with spacing between them.

**Flow**:
```
Media → Time Delay (0.5s) → Media → Time Delay (0.5s) → QuestionText
```

**Result**:
- Bot sends first image
- Bot waits 0.5 seconds
- Bot sends second image
- Bot waits 0.5 seconds
- Bot asks a question

### 4. Pre-API Call Delay

**Scenario**: You want to add a delay before making an API call to ensure proper timing.

**Flow**:
```
QuestionText → Time Delay (0.5s) → APIRequest → Media
```

**Result**:
- User submits request
- Bot waits 0.5 seconds
- Bot makes API call
- Bot displays response

---

## Best Practices

### DO:
- Use 0.5s delays for quick acknowledgments
- Use 1s delays for processing time simulation
- Place delays between consecutive messages for better readability
- Test your flow to ensure delays feel natural

### DON'T:
- Use delays longer than 1 second (not available in current version)
- Add delays before critical user interactions (can feel slow)
- Overuse delays (can make the bot feel unresponsive)
- Place delays in time-sensitive flows

---

## Technical Details

### Execution Flow

```
1. Bot reaches Time Delay component
2. Delay starts (0.5s or 1s)
3. Log entry: "Executing time delay of X seconds"
4. Delay completes
5. Bot continues to next component
```

### Logging

Time Delay execution is logged in the bot execution logs:
```
Executing time delay of 0.5 seconds
```

This helps with debugging and monitoring bot performance.

---

## Troubleshooting

### Issue: Delay seems too short or too long

**Solution**: 
- For quicker pacing, use 0.5 seconds
- For more noticeable pauses, use 1 second
- Consider user expectations - longer delays may feel sluggish

### Issue: Delay doesn't seem to execute

**Solution**: 
- Check the bot execution logs for delay entries
- Verify the component is connected properly in your flow
- Ensure the bot flow actually reaches the Time Delay component

### Issue: Bot feels slow with delays

**Solution**: 
- Reduce the number of Time Delay components
- Use shorter delays (0.5s) instead of longer ones (1s)
- Consider removing delays from critical user interaction points

---

## Need Help?

**Email**: contact@intalos.de

**Common Questions**:
- Can I use delays longer than 1 second? Not in the current version
- Can I add multiple delays in sequence? Yes, but be mindful of total wait time
- Will delays affect bot performance? Minimal impact, delays are optimized

---

**Last Updated**: October 2025

