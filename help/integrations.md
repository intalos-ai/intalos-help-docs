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

**Last Updated**: December 2025

