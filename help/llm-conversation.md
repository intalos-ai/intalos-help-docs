# <img src="../images/icons/llm-conversation.svg" width="32" height="32" style="vertical-align: middle; margin-right: 8px;"> LLM Conversation

## Overview

The **LLM Conversation** component integrates AI-powered conversations into your bot using Large Language Models (LLMs). Create intelligent, context-aware responses, build conversational AI experiences, and add natural language processing to your flows.

## When to Use LLM Conversation

Ideal for scenarios like:
- AI-powered customer support
- Natural language Q&A
- Content generation
- Text analysis and summarization
- Conversational interfaces
- Intelligent recommendations
- Dynamic response generation

---

## Component Modes

### Conversation Mode

**Purpose**: Multi-turn conversations with memory

**Use when**:
- Building chatbots with ongoing dialogue
- Context from previous messages matters
- Users ask follow-up questions
- Maintaining conversation history

**Features**:
- Conversation history tracking
- Context preservation across messages
- Memory of previous exchanges
- Natural back-and-forth dialogue

**Example flow**:
```
User: "What's the weather?"
AI: "I can help with that. Which city?"
User: "New York"
AI: "Let me check New York weather for you..."
```

### Processing Mode

**Purpose**: Single prompt-response operations

**Use when**:
- One-off text processing
- Data analysis tasks
- Content generation
- Translation
- Summarization
- No conversation history needed

**Features**:
- No history tracking
- Faster processing
- Lower token usage
- Stateless operation

**Example**:
```
Input: User's long text
Process: Summarize the text
Output: Brief summary
```

---

## Configuration

### AI Provider & Model

#### Select Provider

Currently supported:
- **Google Gemini** - Fast, cost-effective, multilingual

#### Select Model

**Google Gemini models**:
- `gemini-pro` - Best for text
- `gemini-1.5-flash` - Fastest, most cost-effective
- `gemini-1.5-pro` - Most capable

### API Configuration

#### Get API Key

**Google Gemini**:
1. Visit: https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy the key
4. Paste into component

#### Configure in

1. **Provider**: Select "Google Gemini"
2. **Model**: Choose your model
3. **API Token**: Paste your API key
4. Click "Apply Changes"

### System Prompt

Define the AI's role and behavior:

```
You are a helpful customer service assistant for Acme Corp.
You are friendly, professional, and concise.
Always end responses with a question to keep the conversation going.
```

**Best practices**:
- Be specific about role and tone
- Set clear boundaries
- Define response style
- Include do's and don'ts

**Examples**:
```
You are a technical support expert. Provide clear, step-by-step solutions.
```

```
You are a friendly sales assistant. Be enthusiastic but not pushy.
```

### Context (Optional)

Additional context for every request:

```
Customer Name: {userName}
Account Type: {accountType}
Previous Orders: {orderHistory}
```

**Use for**:
- Providing user-specific information
- Adding business context
- Including relevant data
- Personalizing responses

---

## Conversation Mode Settings

### Enable History

Track conversation across multiple messages:

1. Toggle **"Enable History"** to ON
2. In **"History storage variable"**, enter variable name:
   ```
   Example: chatHistory
   Example: conversationMemory
   ```

**How it works**:
- Stores last 5 message pairs (user + AI)
- Maintains context across exchanges
- Automatically managed
- Saved in specified variable

### Without History

When disabled:
- Each message treated independently
- No memory of previous exchanges
- Lower token usage
- Faster responses

---

## Processing Mode Settings

Use LLM for one-time processing tasks:

1. **Mode**: Select "Processing"
2. **Prompt variable**: Enter variable containing the text to process
   ```
   Example: textToSummarize
   Example: contentToAnalyze
   ```

**Use cases**:
- Summarize user's long response
- Translate text
- Extract information
- Analyze sentiment
- Generate content

---

## Store AI Response

Save the AI's response:

1. In **"Store output in variable"**, enter variable name:
   ```
   Example: aiResponse
   Example: generatedContent
   Example: summaryText
   ```

2. Use the response later:
   ```
   The AI said: {aiResponse}
   ```

---

## How It Works

### Conversation Mode Flow

1. **User sends message**: "What are your business hours?"
2. **LLM receives**:
   - System prompt
   - Context
   - Conversation history (if enabled)
   - User message
3. **AI processes** and generates response
4. **Response stored** in variable
5. **History updated** with user + AI messages
6. **Flow continues** to next component

### Processing Mode Flow

1. **Text collected** in previous component
2. **LLM receives**:
   - System prompt
   - Context
   - Text to process
3. **AI processes** the text
4. **Result stored** in output variable
5. **Flow continues**

---

## Use Cases & Examples

### 1. Customer Support Chatbot

**Mode**: Conversation 
**System Prompt**:
```
You are a customer support agent for TechStore.
Help customers with product questions, order tracking, and returns.
Be friendly and professional. If you don't know something, offer to connect them with a human agent.
```

**Context**:
```
Customer: {userName}
Order History: {orderHistory}
Account Since: {accountCreated}
```

**History**: Enabled 
**Output Variable**: `aiResponse`

### 2. Text Summarization

**Mode**: Processing 
**System Prompt**:
```
Summarize the following text in 2-3 sentences. Keep it concise and factual.
```

**Prompt Variable**: `userFeedback` 
**Output Variable**: `feedbackSummary`

**Flow**:
```
Collect feedback (QuestionText)
-> Store in {userFeedback}
   -> LLM (summarize)
      -> Email summary to team
```

### 3. Product Recommendations

**Mode**: Conversation 
**System Prompt**:
```
You are a product recommendation assistant.
Ask questions to understand customer needs, then recommend products from our catalog.
Be consultative and helpful.
```

**Context**:
```
Available Products: {productCatalog}
Customer Budget: {budget}
```

### 4. FAQ Bot

**Mode**: Conversation 
**System Prompt**:
```
You are an FAQ assistant for Acme Services.
Answer questions about our services, pricing, and policies.
Use the provided knowledge base. If question is outside scope, politely redirect to human support.
```

**Context**:
```
Knowledge Base: {faqContent}
Business Hours: Mon-Fri 9AM-5PM EST
```

---

## Best Practices

### System Prompt Design

**DO**:
- Be specific about role and expertise
- Set clear boundaries
- Define tone and style
- Include response guidelines
- Specify what to do when unsure

**DON'T**:
- Leave prompt too vague
- Make unrealistic claims
- Ignore potential edge cases
- Forget to set tone

### Context Management

**DO**:
- Include relevant user information
- Add business-specific data
- Keep context focused and concise
- Update context with new information

**DON'T**:
- Include irrelevant information
- Make context too long (increases costs)
- Include sensitive data unnecessarily

### History Management

**DO**:
- Enable history for conversations
- Use descriptive variable names
- Monitor history growth
- Disable for processing tasks

**DON'T**:
- Enable history when not needed (costs more)
- Share history between different conversations
- Store excessively long histories

---

## Token Usage & Costs

### Understanding Tokens

- **Tokens**: Words or word pieces used in AI processing
- **You pay for**: Input tokens + output tokens
- **History multiplies cost**: More history = more tokens

### Optimizing Costs

**Reduce costs by**:
- Using processing mode when history not needed
- Limiting history to last 5 exchanges
- Keeping system prompts concise
- Trimming AI output
- Choosing efficient models (gemini-1.5-flash)

### Model Selection

**gemini-1.5-flash**:
- Fastest
- Most cost-effective
- Good for most use cases

**gemini-1.5-pro**:
- Most capable
- Better for complex tasks
- Higher cost

**gemini-pro**:
- Balanced option
- Good for conversations

---

## Error Handling

### Error Output Port

Route the conversation when AI fails:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - API key invalid or expired
    - Network connection issues
    - Model not available
    - Token limit exceeded
    - Content policy violations

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   Sorry, our AI assistant is temporarily unavailable. Please try again or contact support.
   ```

### Admin Email Notification

Get notified when errors occur:

1. Toggle **"Admin email when error"** to ON
2. Notifications sent to your registered admin email
3. Includes error details and conversation context

---

## Testing

### Test Your Configuration

1. Click **"Test LLM"** button in the component inspector
2. Enter a test question
3. Click **"Send Test"**
4. Review AI response
5. Verify tone, accuracy, and format

**Test scenarios**:
- Typical user questions
- Edge cases
- Follow-up questions (if history enabled)
- Unclear or ambiguous inputs

---

## Technical Details

### Request Format

**Conversation mode**:
```
Messages sent to AI:
[
  {role: "user", parts: ["Previous user message"]},
  {role: "model", parts: ["Previous AI response"]},
  {role: "user", parts: ["Current user message"]}
]
```

**Processing mode**:
```
Single prompt from variable
```

### History Storage

**Format**: JSON array
```json
[
  {"role": "user", "parts": ["User message 1"]},
  {"role": "model", "parts": ["AI response 1"]},
  {"role": "user", "parts": ["User message 2"]},
  {"role": "model", "parts": ["AI response 2"]}
]
```

**Limit**: Last 5 message pairs (10 total messages)

### Response Processing

- **Whitespace trimming**: Enabled by default
- **Character limit**: WhatsApp 1024 char limit applied
- **Format**: Plain text (HTML stripped)
- **Encoding**: UTF-8

---

## Security & Privacy

### API Key Security

**DO**:
- Keep API keys confidential
- Regenerate if exposed
- Use separate keys for test/production
- Monitor usage in provider dashboard

**DON'T**:
- Share API keys
- Commit keys to version control
- Screenshot keys
- Reuse keys across projects

### User Privacy

**DO**:
- Inform users they're talking to AI
- Follow data privacy regulations
- Clear sensitive data from history
- Secure conversation logs

**DON'T**:
- Store sensitive personal information in history
- Share user conversations
- Train models on private data without consent

---

## Common Patterns

### Conversational Support Bot

```
Start
-> LLM Conversation (mode: conversation, history: ON)
   -> User asks questions
      -> AI responds with context
         -> Loop back for more questions
            -> "Done" button -> End
```

### Text Analysis Pipeline

```
QuestionText (collect feedback)
-> LLM (mode: processing, summarize)
   -> Store summary
      -> LLM (mode: processing, sentiment analysis)
         -> Store sentiment
            -> Route based on sentiment
```

### Hybrid Bot

```
Menu (QuestionButtons)
|-- "Talk to AI" -> LLM Conversation (history: ON)
|-- "Quick FAQ" -> Predefined responses
\-- "Human Agent" -> Transfer to support
```

---

## Troubleshooting

### Issue: "Authentication Error"

**Solution**:
- Verify API key is correct
- Check key hasn't expired
- Ensure key has proper permissions
- Regenerate key if needed

### Issue: Responses are too generic

**Solution**:
- Improve system prompt specificity
- Add more context
- Use more capable model
- Include examples in system prompt

### Issue: AI hallucinates information

**Solution**:
- Add "stick to facts" in system prompt
- Provide reference information in context
- Instruct AI to say "I don't know" when uncertain
- Review and refine system prompt

### Issue: High costs

**Solution**:
- Disable history if not needed
- Use processing mode for one-off tasks
- Switch to gemini-1.5-flash model
- Shorten system prompts and context
- Limit conversation length

### Issue: Slow responses

**Solution**:
- Use faster model (gemini-1.5-flash)
- Reduce history length
- Minimize context size
- Check network connection

---

## Advanced Tips

### Dynamic System Prompts

Include variables in your system prompt:
```
You are a {businessType} assistant helping with {serviceCategory} inquiries.
Customer tier: {customerTier}
```

### Structured Outputs

Train AI to return structured data:
```
System Prompt: "Return responses in format: CATEGORY: xxx, PRIORITY: xxx, ACTION: xxx"
```

Then parse the response with CustomCode.

### Fallback Pattern

```
LLM Conversation
|-- Success -> Check if AI answered satisfactorily
│            |-- Yes -> Continue
│            \-- No -> Transfer to human
\-- Error -> Fallback message
```

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: October 20, 2025

