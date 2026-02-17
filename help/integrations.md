# Integrations

## Overview

**Integrations** connect your Intalos AI bots to external platforms and services, enabling your bots to interact with users through various channels and access external data and functionality. Integrations are separate from bot components and are configured at the account level.

---

## WhatsApp Integrations

### What is a WhatsApp Integration?

A **WhatsApp Integration** connects your bot to WhatsApp Business API, allowing your bot to send and receive messages through WhatsApp. This enables you to build conversational experiences that users can access directly from their WhatsApp app.

### When to Use WhatsApp Integration

Perfect for scenarios like:
- Customer support chatbots
- Order processing and tracking
- Appointment scheduling
- Information delivery services
- Interactive surveys and feedback
- Automated notifications
- E-commerce assistance

---

## How WhatsApp Integrations Work

### Architecture Overview

```
WhatsApp User
    ↓ (sends message)
WhatsApp Business API
    ↓ (webhook)
Intalos AI Platform
    ↓ (processes with your bot)
Bot Flow Execution
    ↓ (generates response)
WhatsApp Business API
    ↓ (sends message)
WhatsApp User
```

### Key Concepts

**Integration**: A connection between your Intalos AI account and a WhatsApp Business account. You can have multiple integrations for different WhatsApp numbers or business accounts.

**Bot Connection**: Each integration can be connected to one published bot. When a message arrives via WhatsApp, it triggers that bot's flow.

**Webhooks**: WhatsApp sends incoming messages to Intalos AI via webhooks. The integration handles webhook verification and message routing.

---

## Setting Up a WhatsApp Integration

### Prerequisites

Before creating a WhatsApp integration, you need:

1. **A Published Bot**: Your bot must be published before you can connect it to a WhatsApp integration
2. **WhatsApp Business API Credentials**: You'll need:
   - Business Account ID
   - Phone Number ID
   - App ID and App Secret
   - Access Token (short-lived, which will be exchanged for a long-lived token)
   - Verify Token (for webhook verification)

### Getting WhatsApp Business API Credentials

**Option 1: Meta Business Account (Self-Setup)**

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create or access your Meta Business Account
3. Set up a WhatsApp Business App
4. Get your credentials from the app dashboard:
   - Business Account ID
   - Phone Number ID
   - App ID and App Secret
   - Generate a short-lived Access Token
   - Create a Verify Token (any secure random string)

**Option 2: Intalos AI Managed (Depending on Your Plan)**

Contact Intalos AI support to request a WhatsApp Business number and credentials.

### Step-by-Step Setup

#### 1. Navigate to Integrations

1. Log in to your Intalos AI account
2. Click on **"Integrations"** in the main navigation
3. You'll see a list of your existing integrations

#### 2. Create New WhatsApp Integration

1. Click **"Create Integration"** or **"Add WhatsApp Integration"**
2. Select **"WhatsApp Business"** as the integration type

#### 3. Configure Basic Settings

**Integration Name** (optional):
- Give your integration a descriptive name (e.g., "Main Customer Support Line")
- This helps you identify it if you have multiple integrations

**Integrated Bot**:
- Select the published bot you want to connect
- **Important**: The bot must be published before it appears in this list
- Bots in the selection dropdown are shown in alphabetical order for easier lookup
- You can change this later if needed

#### 4. Enter WhatsApp Credentials

Fill in the required fields:

**Business Account ID**:
- Your Meta Business Account ID
- Found in Meta Business Manager or WhatsApp Business API dashboard

**Phone Number ID**:
- The ID of your WhatsApp Business phone number
- Found in your WhatsApp Business API app settings

**App ID**:
- Your Meta App ID
- Found in your Meta App dashboard

**App Secret**:
- Your Meta App Secret
- Keep this secure and never share it publicly

**Access Token** (Short-lived):
- A temporary access token from Meta
- Intalos AI will automatically exchange this for a long-lived token
- Found in your Meta App dashboard (generate a new one if needed)

**Verify Token**:
- A secure random string you create
- Used for webhook verification
- Example: `my_secure_verify_token_12345`
- **Important**: You'll need to enter this same token in your Meta webhook configuration

**Version**:
- WhatsApp API version (default: `v21.0`)
- Usually doesn't need to be changed

#### 5. Configure Integration Settings

**Error Email Alerts**:
- Toggle ON to receive email notifications when integration errors occur
- Enter the email address where you want to receive alerts

**Integration Expiry Time**:
- Set a time limit for inactive conversations
- When enabled, conversations that haven't received messages for the specified time will expire
- Useful for managing conversation state and resources

**WhatsApp Template** (Optional):
- If you want to send template messages, configure the template name and language code
- Templates must be approved by Meta before use

**Trigger Recipients** (Optional):
- Configure who can trigger the bot
- Can be set to specific phone numbers or left open for all users

#### 6. Activate the Integration

1. Review all your settings
2. Click **"Save"** or **"Create Integration"**
3. **Important**: After creating, make sure to **activate** the integration
   - Toggle the "Active" switch to ON
   - The integration must be active to receive and send messages

#### 7. Configure Webhook in Meta

After creating your integration in Intalos AI, you need to configure the webhook in Meta:

1. Go to your Meta App dashboard
2. Navigate to **Webhooks** section
3. **Contact Intalos AI support** (contact@intalos.de) to get the correct Intalos AI webhook URL for your account
4. Add the webhook URL provided by Intalos AI support
5. Enter the **Verify Token** you used when creating the integration
6. Subscribe to **messages** events
7. Verify the webhook (Meta will send a verification request)

---

## Managing Your Integration

### Viewing Integration Status

In the Integrations list, you can see:
- **Integration Name**: Your custom name for the integration
- **Status**: Active or Inactive
- **Connected Bot**: Which bot is currently connected
- **Last Activity**: When the integration last received or sent a message

### Editing an Integration

1. Click on the integration in the list
2. Make your changes
3. Click **"Save"**
4. Changes take effect immediately (if integration is active)

### Activating/Deactivating

- **To activate**: Toggle the "Active" switch to ON
- **To deactivate**: Toggle the "Active" switch to OFF
- When deactivated, the integration won't receive or send messages

### Changing Connected Bot

1. Open the integration
2. Select a different published bot from the "Integrated Bot" dropdown
3. Save the changes
4. New conversations will use the new bot, but existing conversations will continue with their current bot

### Deleting an Integration

1. Open the integration
2. Click **"Delete"** (usually at the bottom of the form)
3. Confirm the deletion
4. **Warning**: This cannot be undone. All webhook connections will be lost.

---

## How Messages Flow

### Incoming Messages

1. User sends a message via WhatsApp
2. WhatsApp Business API receives the message
3. Meta sends a webhook to Intalos AI
4. Intalos AI verifies the webhook signature
5. The message is routed to the connected bot
6. Bot flow executes based on the message content
7. Bot generates a response
8. Response is sent back to the user via WhatsApp

### Outgoing Messages

1. Your bot flow reaches a component that sends a message (e.g., QuestionText, Media)
2. Intalos AI formats the message for WhatsApp
3. Message is sent via WhatsApp Business API
4. User receives the message in WhatsApp

### Message Types Supported

- **Text Messages**: Plain text responses
- **Media Messages**: Images, videos, audio, documents
- **Interactive Messages**: Buttons, lists (via QuestionButtons, QuestionList components)
- **Template Messages**: Pre-approved message templates (requires Meta approval)

---

## Best Practices

### Security

**DO**:
- Keep your App Secret and Access Token secure
- Use strong, unique Verify Tokens
- Regularly rotate access tokens
- Monitor integration error alerts
- Use HTTPS for all webhook communications (handled automatically by Intalos AI)

**DON'T**:
- Share your credentials publicly
- Commit credentials to version control
- Use the same Verify Token for multiple integrations
- Leave integrations active if not in use

### Performance

**DO**:
- Monitor your integration's activity
- Set appropriate expiry times for inactive conversations
- Use efficient bot flows to reduce response times
- Test your bot thoroughly before connecting to production integration

**DON'T**:
- Create unnecessary integrations
- Leave expired conversations running
- Overload your bot with complex flows that slow responses

### User Experience

**DO**:
- Provide clear instructions to users
- Respond quickly to user messages
- Handle errors gracefully
- Test your bot with real WhatsApp messages before going live

**DON'T**:
- Send too many messages in quick succession
- Ignore user messages
- Use technical error messages users won't understand

---

## Troubleshooting

### Integration Not Receiving Messages

**Check**:
1. Is the integration **active**? (Toggle must be ON)
2. Is the webhook configured correctly in Meta?
3. Is the Verify Token matching in both places?
4. Is the connected bot **published**?
5. Check integration error alerts for specific issues

**Solution**:
- Verify webhook configuration in Meta dashboard
- Check that webhook is subscribed to "messages" events
- Ensure integration is active and bot is published

### Messages Not Sending

**Check**:
1. Is the integration active?
2. Is the Access Token valid and not expired?
3. Are there any error alerts in your email?
4. Is the bot flow completing successfully?

**Solution**:
- Regenerate Access Token in Meta if expired
- Check bot flow for errors
- Review integration error logs

### Webhook Verification Failing

**Check**:
1. Is the Verify Token exactly the same in both Intalos AI and Meta?
2. Is the webhook URL correct?
3. Is the webhook accessible (Intalos AI handles this automatically)?

**Solution**:
- Double-check Verify Token matches exactly (case-sensitive)
- Re-enter the Verify Token in Meta webhook settings
- Contact support if issues persist

### Bot Not Responding

**Check**:
1. Is the bot published?
2. Is the bot connected to the integration?
3. Is the bot flow working correctly in test mode?
4. Are there any errors in the bot execution?

**Solution**:
- Test the bot in Bot Builder test mode first
- Ensure bot is published before connecting to integration
- Check bot flow for logical errors or missing connections

---

## Integration Limits

### Current Limits

- **Integrations per account**: Multiple integrations supported
- **Bots per integration**: 1 bot per integration (can be changed)
- **Message rate**: Subject to WhatsApp Business API limits
- **Webhook timeout**: 20 seconds (WhatsApp requirement)

### WhatsApp Business API Limits

- **Rate limits**: Vary by tier (check Meta documentation)
- **Template messages**: Require Meta approval
- **24-hour messaging window**: After user messages you, you have 24 hours to respond with free-form messages

---

## Advanced Features

### Multiple Integrations

You can create multiple WhatsApp integrations for:
- Different phone numbers
- Different business accounts
- Different bots
- Testing vs production environments

### Integration Settings

**Error Email Alerts**:
- Get notified immediately when integration errors occur
- Helps you respond quickly to issues
- Configure in integration settings

**Expiry Time**:
- Automatically expire inactive conversations
- Helps manage conversation state
- Prevents resource buildup from abandoned conversations

---

## Need Help?

**Email**: contact@intalos.de

**Common Questions**:
- How do I get WhatsApp Business API credentials? See "Getting WhatsApp Business API Credentials" section above
- Can I use the same bot with multiple integrations? Yes, but each integration connects to one bot at a time
- What happens if my Access Token expires? Intalos AI handles token refresh automatically for long-lived tokens
- Can I test my integration before going live? Yes, use the Bot Builder test mode first, then create a test integration

---

## API Integrations

### What is an API Integration?

An **API Integration** allows your bot to be triggered and interacted with via REST API calls, enabling you to integrate your bot into custom applications, websites, mobile apps, or any system that can make HTTP requests. Instead of users interacting through WhatsApp, they interact through your own application's interface while your bot handles the conversation logic.

### When to Use API Integration

Perfect for scenarios like:
- **Custom Web Applications**: Embed conversational bots into your website
- **Mobile Apps**: Add bot functionality to iOS or Android applications
- **Backend Services**: Integrate bot logic into your existing backend systems
- **Third-Party Integrations**: Connect bots to other platforms via API
- **White-Label Solutions**: Provide bot functionality under your own brand
- **Multi-Channel Support**: Use the same bot logic across different channels
- **Programmatic Access**: Trigger bots from scripts, automation tools, or scheduled tasks

---

## How API Integrations Work

### Architecture Overview

```
Your Application/Website
    ↓ (HTTP POST request)
Intalos AI API Endpoint
    ↓ (authenticates with API key)
Bot Flow Execution
    ↓ (processes request)
Bot Generates Response
    ↓ (returns JSON)
Your Application/Website
    ↓ (displays to user)
User Interface
```

### Key Concepts

**Integration**: A connection between your Intalos AI account and your application. Each integration has a unique API key for authentication.

**Session**: A conversation session represents a single user's interaction with your bot. Each session has a unique `session_id` that you provide or that gets auto-generated.

**API Key**: A secure token used to authenticate API requests. API keys are encrypted at rest and should be kept secret.

**Endpoints**: Two main endpoints:
- **Session Start**: `/api/integrations/api/<integration_id>/session/` - Start a new conversation
- **Send Message**: `/api/integrations/api/<integration_id>/session/<session_id>/message/` - Continue an existing conversation

---

## Setting Up an API Integration

### Prerequisites

Before creating an API integration, you need:

1. **A Published Bot**: Your bot must be published before you can connect it to an API integration
2. **Your Application Ready**: Have your application, website, or system ready to make HTTP requests

### Step-by-Step Setup

#### 1. Navigate to Integrations

1. Log in to your Intalos AI account
2. Click on **"Integrations"** in the main navigation
3. Click on **"API Integration"** card

#### 2. Create New API Integration

1. Click **"Create API Integration"** or **"Add New"**
2. You'll see the API Integration form

#### 3. Configure Basic Settings

**Integration Alias**:
- Give your integration a descriptive name (e.g., "Customer Support API", "Mobile App Bot")
- This helps you identify it if you have multiple integrations
- Example: `production-customer-support`

**API Key**:
- **Option 1**: Leave blank to auto-generate a secure API key
- **Option 2**: Provide your own API key (must be a secure random string)
- **Important**: Save this key securely - you'll need it for API authentication
- The key will be displayed once after creation (masked in the UI afterward)
- Example auto-generated key: `xK9mP2qR7vW4nT8yU1zA5bC6dE3fG0hI`

**Integrated Bot**:
- Select the published bot you want to connect
- **Important**: The bot must be published before it appears in this list
- Bots in the selection dropdown are shown in alphabetical order for easier lookup
- You can change this later if needed

**Error Email Alerts**:
- Toggle ON to receive email notifications when integration errors occur
- Enter the email address where you want to receive alerts

#### 4. Save and Activate

1. Review all your settings
2. Click **"Save"** or **"Create Integration"**
3. **Important**: After creating, make sure to **activate** the integration
   - Toggle the "Active" switch to ON
   - The integration must be active to accept API requests
4. **Save your API Key**: Copy the API key immediately after creation
   - It will be masked in future views for security
   - If lost, you'll need to regenerate it

---

## Using the API Integration

### Base URL

All API endpoints use your Intalos AI instance base URL:
```
https://your-instance.intalos.de/api/integrations/api/<integration_id>/
```

### Authentication

API requests must include your API key in one of two ways:

**Option 1: X-API-Key Header** (Recommended)
```http
X-API-Key: your_api_key_here
```

**Option 2: Authorization Bearer Header**
```http
Authorization: Bearer your_api_key_here
```

**Note**: If both headers are present, `X-API-Key` takes precedence.

### Idempotency

To safely retry requests (e.g. after network timeouts), use the `Idempotency-Key` header. When you send the same key with the same request body, the API returns the cached response instead of executing again.

**Header**:
```http
Idempotency-Key: your-unique-key-per-request
```

**Behavior**:
- Use a unique key per distinct operation (e.g. UUID, or `session_id` + sequence number)
- Same key + same body → returns cached response with `"idempotency_replayed": true`
- Same key + different body → returns `409 Conflict` with error
- Key is optional; omit it for non-idempotent requests

**Supported endpoints**: Session start and Send message.

### Starting a Session

**Endpoint**: `POST /api/integrations/api/<integration_id>/session/`

**Request Headers**:
```http
Content-Type: application/json
X-API-Key: your_api_key_here
Idempotency-Key: optional-unique-key-for-retries
```

**Request Body** (all fields optional):
```json
{
  "session_id": "user-123",           // Optional: custom session ID (auto-generated if omitted)
  "user_identifier": "user-123",      // Optional: user identifier for logging (defaults to session_id)
  "force_restart": false,             // Optional: force restart even if session exists (default: false)
  "variables": {                      // Optional: seed bot variables at session start (requires variable injection enabled in integration settings)
    "customer_name": "Alice",
    "order_id": "ORD-123"
  },
  "message_payload": "Hello"          // Optional: sets on_create_message_payload for the initial trigger (e.g. for bots that branch on first input)
}
```

**Variable injection**: The `variables` field lets you pre-populate bot variables when starting a session. This must be enabled in your API integration settings. Variable names must match variables defined in Bot Settings.

**Response** (Success - 200 OK):
```json
{
  "session_id": "user-123",
  "state": "component_id_abc",
  "message": {
    "type": "text",
    "text": "Hello! How can I help you?"
  },
  "messages": [
    {
      "type": "text",
      "text": "Hello! How can I help you?"
    }
  ],
  "is_final": false
}
```

**Response Fields**:
- `session_id`: The session identifier (your provided one or auto-generated)
- `state`: Current bot state/component ID
- `message`: The first message from the bot (for convenience)
- `messages`: Array of all messages from the bot in this response
- `is_final`: Whether the bot has reached an End component (conversation complete)
- `idempotency_replayed`: If present and `true`, this is a cached response from an idempotent retry

**Error Responses**:
- `401 Unauthorized`: Invalid or missing API key
- `404 Not Found`: Integration not found or inactive
- `409 Conflict`: Session already exists (use `force_restart: true` or message endpoint)
- `500 Internal Server Error`: Bot execution error

### Sending a Message

**Endpoint**: `POST /api/integrations/api/<integration_id>/session/<session_id>/message/`

**Request Headers**:
```http
Content-Type: application/json
X-API-Key: your_api_key_here
Idempotency-Key: optional-unique-key-for-retries
```

**Request Body** (for text messages):
```json
{
  "message": "Hello, I need help"
}
```

**Request Body** (for button/list selections):
```json
{
  "selected_option_id": "component_id_xyz"
}
```

**Response** (Success - 200 OK):
```json
{
  "session_id": "user-123",
  "state": "component_id_def",
  "message": {
    "type": "buttons",
    "text": "What would you like to do?",
    "options": [
      {
        "id": "component_id_xyz",
        "text": "Option 1"
      },
      {
        "id": "component_id_abc",
        "text": "Option 2"
      }
    ]
  },
  "messages": [
    {
      "type": "buttons",
      "text": "What would you like to do?",
      "options": [
        {
          "id": "component_id_xyz",
          "text": "Option 1"
        },
        {
          "id": "component_id_abc",
          "text": "Option 2"
        }
      ]
    }
  ],
  "is_final": false
}
```

**Message Types**:

The API returns different message types based on your bot components:

**Text Messages**:
```json
{
  "type": "text",
  "text": "Your message here"
}
```

**Button Messages**:
```json
{
  "type": "buttons",
  "text": "Choose an option:",
  "options": [
    {
      "id": "component_id_1",
      "text": "Option 1"
    },
    {
      "id": "component_id_2",
      "text": "Option 2"
    }
  ]
}
```

**List Messages**:
```json
{
  "type": "list",
  "text": "Select from list:",
  "options": [
    {
      "id": "component_id_1",
      "text": "Item 1"
    },
    {
      "id": "component_id_2",
      "text": "Item 2"
    }
  ]
}
```

**Media Messages**:
```json
{
  "type": "media",
  "text": "Image caption",
  "media_url": "https://example.com/image.jpg",
  "caption": "Image caption"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or missing API key
- `404 Not Found`: Session not found or integration inactive
- `422 Unprocessable Entity`: Invalid request body format
- `500 Internal Server Error`: Bot execution error

---

## Example Integration Code

### JavaScript/TypeScript Example

```javascript
const API_BASE_URL = 'https://your-instance.intalos.de/api/integrations/api';
const INTEGRATION_ID = 31;
const API_KEY = 'your_api_key_here';

// Start a new session
async function startSession(sessionId = null) {
  const response = await fetch(
    `${API_BASE_URL}/${INTEGRATION_ID}/session/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        session_id: sessionId || `user-${Date.now()}`,
        user_identifier: 'user-123'
      })
    }
  );
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}

// Send a message
async function sendMessage(sessionId, message) {
  const response = await fetch(
    `${API_BASE_URL}/${INTEGRATION_ID}/session/${sessionId}/message/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        message: message
      })
    }
  );
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}

// Select a button/list option
async function selectOption(sessionId, optionId) {
  const response = await fetch(
    `${API_BASE_URL}/${INTEGRATION_ID}/session/${sessionId}/message/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        selected_option_id: optionId
      })
    }
  );
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
}

// Usage example
async function chatExample() {
  // Start conversation
  const session = await startSession('my-user-123');
  console.log('Bot:', session.message.text);
  
  // Send user message
  const response1 = await sendMessage(session.session_id, 'Hello!');
  console.log('Bot:', response1.message.text);
  
  // If bot sent buttons, select one
  if (response1.message.type === 'buttons') {
    const optionId = response1.message.options[0].id;
    const response2 = await selectOption(session.session_id, optionId);
    console.log('Bot:', response2.message.text);
  }
}
```

### Python Example

```python
import requests

API_BASE_URL = 'https://your-instance.intalos.de/api/integrations/api'
INTEGRATION_ID = 31
API_KEY = 'your_api_key_here'

headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
}

def start_session(session_id=None):
    """Start a new bot session."""
    url = f'{API_BASE_URL}/{INTEGRATION_ID}/session/'
    data = {
        'session_id': session_id or f'user-{int(time.time())}',
        'user_identifier': 'user-123'
    }
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()
    return response.json()

def send_message(session_id, message):
    """Send a text message to the bot."""
    url = f'{API_BASE_URL}/{INTEGRATION_ID}/session/{session_id}/message/'
    data = {'message': message}
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()
    return response.json()

def select_option(session_id, option_id):
    """Select a button or list option."""
    url = f'{API_BASE_URL}/{INTEGRATION_ID}/session/{session_id}/message/'
    data = {'selected_option_id': option_id}
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()
    return response.json()

# Usage example
session = start_session('my-user-123')
print(f"Bot: {session['message']['text']}")

response = send_message(session['session_id'], 'Hello!')
print(f"Bot: {response['message']['text']}")

if response['message']['type'] == 'buttons':
    option_id = response['message']['options'][0]['id']
    response2 = select_option(session['session_id'], option_id)
    print(f"Bot: {response2['message']['text']}")
```

### cURL Examples

**Start Session**:
```bash
curl -X POST \
  'https://your-instance.intalos.de/api/integrations/api/31/session/' \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: your_api_key_here' \
  -d '{
    "session_id": "user-123",
    "user_identifier": "user-123"
  }'
```

**Send Message**:
```bash
curl -X POST \
  'https://your-instance.intalos.de/api/integrations/api/31/session/user-123/message/' \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: your_api_key_here' \
  -d '{
    "message": "Hello, I need help"
  }'
```

**Select Option**:
```bash
curl -X POST \
  'https://your-instance.intalos.de/api/integrations/api/31/session/user-123/message/' \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: your_api_key_here' \
  -d '{
    "selected_option_id": "component_id_xyz"
  }'
```

---

## Managing Your API Integration

### Viewing Integration Details

In the API Integration form, you can see:
- **Integration Alias**: Your custom name for the integration
- **API Endpoints**: Direct links to the session endpoints (displayed when editing)
- **Status**: Active or Inactive
- **Connected Bot**: Which bot is currently connected
- **Created Date**: When the integration was created

### Editing an Integration

1. Click on the integration in the list
2. Make your changes:
   - Update the alias
   - Change the connected bot
   - Update error email settings
   - **Note**: API key cannot be changed (create new integration if needed)
3. Click **"Save"**
4. Changes take effect immediately (if integration is active)

### Regenerating API Key

If you need a new API key:
1. Create a new API integration
2. Update your application to use the new API key
3. Delete the old integration once migration is complete

**Important**: API keys cannot be edited - you must create a new integration to get a new key.

### Activating/Deactivating

- **To activate**: Toggle the "Active" switch to ON
- **To deactivate**: Toggle the "Active" switch to OFF
- When deactivated, the integration won't accept API requests

### Changing Connected Bot

1. Open the integration
2. Select a different published bot from the "Integrated Bot" dropdown
3. Save the changes
4. New sessions will use the new bot, but existing sessions will continue with their current bot

### Deleting an Integration

1. Open the integration
2. Click **"Delete"** (usually at the bottom of the form)
3. Confirm the deletion
4. **Warning**: This cannot be undone. All API access will be lost.

---

## Session Management

### Session Lifecycle

1. **Start**: Create a new session via `/session/` endpoint
2. **Active**: Send messages via `/session/<id>/message/` endpoint
3. **Final**: Bot reaches End component (`is_final: true`)
4. **Complete**: Session is automatically deleted when final

### Session IDs

- **Custom Session IDs**: Provide your own `session_id` for easier tracking
- **Auto-Generated**: If omitted, a UUID is generated automatically
- **Uniqueness**: Each `session_id` can only have one active session
- **Restarting**: Use `force_restart: true` to restart an existing session

### Force Restart

If you need to restart a session:
```json
{
  "session_id": "user-123",
  "force_restart": true
}
```

This will:
- Delete any existing session with that `session_id`
- Start a fresh conversation from the beginning
- Useful for testing or resetting user sessions

---

## Best Practices

### Security

**DO**:
- Keep your API key secure and never expose it in client-side code
- Use environment variables or secure secret management
- Rotate API keys periodically
- Use HTTPS for all API requests
- Monitor integration error alerts
- Implement rate limiting in your application

**DON'T**:
- Commit API keys to version control
- Share API keys publicly
- Expose API keys in browser JavaScript (use backend proxy)
- Use the same API key for multiple applications
- Leave integrations active if not in use

### Performance

**DO**:
- Reuse session IDs for the same user across requests
- Handle `is_final` flag to know when conversation is complete
- Implement proper error handling and retries
- Cache session state in your application when appropriate
- Monitor API response times

**DON'T**:
- Create new sessions unnecessarily (reuse existing ones)
- Ignore error responses
- Make synchronous API calls in UI thread (use async/await)
- Forget to handle `is_final` state

### User Experience

**DO**:
- Display bot messages clearly in your UI
- Handle button/list options appropriately
- Show loading states while waiting for bot responses
- Handle errors gracefully with user-friendly messages
- Test your integration thoroughly before going live

**DON'T**:
- Expose technical error messages to end users
- Ignore the `is_final` flag
- Make users wait without feedback
- Forget to handle different message types (text, buttons, media)

---

## Troubleshooting

### 401 Unauthorized Error

**Check**:
1. Is the API key correct?
2. Is the `X-API-Key` header present?
3. Is the API key not expired or revoked?

**Solution**:
- Verify API key matches exactly (no extra spaces)
- Check that header name is `X-API-Key` (case-sensitive)
- Ensure integration is active

### 404 Not Found Error

**Check**:
1. Is the integration ID correct?
2. Is the integration active?
3. Is the session ID correct (for message endpoint)?

**Solution**:
- Verify integration ID in the URL
- Check integration status in the UI
- Ensure session was created successfully

### 409 Conflict Error (Session Already Exists)

**Check**:
1. Are you trying to start a session that already exists?
2. Is the previous session still active?

**Solution**:
- Use `force_restart: true` to restart the session
- Use the message endpoint to continue existing session
- Use a different `session_id`

### Messages Not Appearing

**Check**:
1. Is the bot published?
2. Is the bot connected to the integration?
3. Are there any errors in the response?

**Solution**:
- Ensure bot is published before connecting to integration
- Check bot flow for errors
- Review integration error alerts

### Bot Not Responding Correctly

**Check**:
1. Is the bot flow working correctly in test mode?
2. Are you sending the correct message format?
3. Are button/list selections using the correct `option_id`?

**Solution**:
- Test the bot in Bot Builder test mode first
- Verify message format matches API specification
- Check that `option_id` matches the `id` from bot's response

---

## Integration Limits

### Current Limits

- **Integrations per account**: Multiple integrations supported
- **Bots per integration**: 1 bot per integration (can be changed)
- **Sessions**: Unlimited sessions supported
- **Session duration**: Sessions expire after 300 seconds of inactivity
- **Request timeout**: 30 seconds (for bot execution)

### Rate Limiting

- Rate limits may apply based on your plan
- Implement exponential backoff for retries
- Monitor response headers for rate limit information

---

## Advanced Features

### Multiple Integrations

You can create multiple API integrations for:
- Different applications or services
- Different bots
- Testing vs production environments
- Different API keys for different clients

### Session Persistence

- Sessions persist until bot reaches End component (`is_final: true`)
- Sessions automatically expire after 300 seconds of inactivity
- Use `force_restart` to manually restart sessions

### Error Handling

- Always check HTTP status codes
- Handle `is_final` flag to know when conversation ends
- Implement retry logic for transient errors
- Log errors for debugging

---

## Integration Test Runner

The **Test Runner** in Bot Builder lets you run end-to-end integration simulations directly from the canvas. It supports both WhatsApp and API behavior in one place and is the recommended way to validate flows before deployment.

### Where to Find It

- Open your bot in Bot Builder.
- Click the **Test Runner** button in the top action bar.
- The runner opens as a side panel while keeping the canvas visible.

### What It Supports

- **Integration Type Selection**: choose WhatsApp or API in the runner.
- **Default Type**: WhatsApp is selected by default.
- **Simulation Mode**: run tests even if no integration is linked to the bot.
- **Start Variables + On-create payload**: seed variables and payload before starting a session.
- **Media/File Input Steps**:
  - `QuestionMedia`: upload required media file type.
  - `GoogleDrive`: upload file support is available in runner mode.

### Canvas Playback Features

- **Active Component Highlighting**: current component is highlighted during execution.
- **Auto-transition Playback**: optional step-by-step playback for fast transitions.
- **Component Timeline**: optional per-component timeline entries in output.
- **Centering + Zoom**: runner can pan/zoom to active components for easier debugging.

### Output and Timeline

- **Chronological Output**: component timeline entries and bot/user messages are interleaved in execution order.
- **Changed Variables View**: each component event can show changed variable values.
- **Large Output Collapse**: big variable payloads are collapsed with expand/collapse controls.
- **Media Preview**: image/video/audio outputs are rendered inline where possible.

### Session and Cleanup Behavior

- Runner sessions are isolated from production traffic.
- Sessions are cleaned up when the runner is closed.
- Stale runner sessions are automatically cleaned up by inactivity rules.

### UI Improvements in Runner

- Sticky header (title + close button) remains visible while scrolling.
- Sticky composer/footer keeps message/file input, options dropdown, and **Send** visible.
- Clear visual separation between scrollable output and input/send area.

### Variable Delta Fields

In component timeline output:

- `changed`: variables added or updated by that component step.
- `removed_keys`: variables that existed before the step but were removed after it.

---

## Need Help?

**Email**: contact@intalos.de

**Common Questions**:
- How do I get my API key? It's displayed once after creating the integration, or auto-generated if you leave it blank
- Can I use the same bot with multiple API integrations? Yes, each integration can connect to one bot
- What happens if my session expires? Create a new session or use `force_restart: true`
- Can I test my integration before going live? Yes, use the Bot Builder test mode first, then test with API calls
- How do I handle button selections? Use `selected_option_id` with the `id` from the bot's response options

---

**Last Updated**: January 2026

