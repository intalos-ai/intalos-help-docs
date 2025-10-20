# Email Component - User Guide

## Overview

The **Email** component allows you to send automated emails during your bot conversations. Perfect for sending confirmations, notifications, reports, and any email communication triggered by user interactions.

## When to Use Email

Ideal for scenarios like:
- Order confirmations
- Receipt delivery
- Appointment notifications
- Form submissions
- Support ticket creation
- Lead notifications to your team
- Follow-up communications

---

## Configuration

### Email Provider

Choose how emails will be sent:

#### Option 1: contact@intalos.de (Managed Email Service)
- **Best for**: Users who want a simple, managed email solution
- **Requires**: Pass Key from Intalos team
- **Setup**:
  1. Select "contact@intalos.de" from provider dropdown
  2. A warning will appear: "Please contact contact@intalos.de for the Intalos AI email Pass Key"
  3. Contact contact@intalos.de to request your Pass Key
  4. Enter the Pass Key in the password field

**Note**: To use this email service, contact us at contact@intalos.de to receive your Pass Key.

#### Option 2: Postmark (Self-Managed)
- **Best for**: Users who want full control and high deliverability
- **Requires**: Postmark account and API key
- **Setup**:
  1. Select "Postmark" from provider dropdown
  2. Enter your **sender email address**
  3. Enter your **Postmark API key**
  4. Verify sender email in Postmark dashboard

**Get Postmark**:
- Sign up at postmarkapp.com
- Verify your sender domain/email
- Generate API token from settings
- Add to component configuration

---

## Email Fields

### Send To (Recipients)

Specify who receives the email:

**Single recipient**:
```
john@example.com
```

**Multiple recipients** (comma-separated):
```
john@example.com, jane@example.com, support@company.com
```

**Using variables**:
```
{userEmail}
{adminEmail}, {managerEmail}
sales@company.com, {customerEmail}
```

**Pro Tip**: Store email addresses in variables from previous components (QuestionText, APIRequest).

### Email Subject

The subject line of your email:

```
Order Confirmation - #{orderNumber}
New Support Ticket from {userName}
Your Appointment on {appointmentDate}
```

**Best practices**:
- Keep under 60 characters for mobile visibility
- Include relevant details
- Use variables for personalization
- Be clear and specific

### Email Message

The main content of your email:

**Rich text editor supports**:
- **Bold**, *italic*, underline text
- Headings (H1, H2, H3)
- Bullet lists and numbered lists
- Variables: `{userName}`, `{orderDetails}`, etc.
- Line breaks and paragraphs

**Example message**:
```
Hi {userName},

Thank you for your order!

Order Details:
- Product: {productName}
- Quantity: {quantity}
- Total: ${totalAmount}

We'll send a confirmation when your order ships.

Best regards,
The Team
```

---

## How It Works

### Email Flow

1. **User** completes action in bot (places order, submits form, etc.)
2. **Email component** triggers
3. **Variables** are replaced with actual values
4. **Email** sent via configured provider
5. **Flow** continues to next component

### Behind the Scenes

1. Email content compiled with variable substitution
2. HTML formatted from rich text editor
3. Sent via Postmark or Intalos SMTP
4. Delivery tracked and logged
5. Errors caught and routed if configured

---

## Use Cases & Examples

### 1. Order Confirmation

**Configuration**:
- Provider: Postmark
- Send to: `{customerEmail}`
- Subject: `Order Confirmation - #{orderNumber}`
- Message:
  ```
  Hi {customerName},
  
  Your order has been confirmed!
  
  Order Number: {orderNumber}
  Total: ${orderTotal}
  
  Thank you for your purchase!
  ```

### 2. Lead Notification to Team

**Configuration**:
- Provider: Postmark
- Send to: `sales@company.com, manager@company.com`
- Subject: `New Lead: {userName}`
- Message:
  ```
  New lead from WhatsApp bot:
  
  Name: {userName}
  Email: {userEmail}
  Phone: {userPhone}
  Interest: {productInterest}
  ```

### 3. Appointment Confirmation

**Configuration**:
- Provider: Postmark
- Send to: `{customerEmail}`
- Subject: `Appointment Confirmed - {appointmentDate}`
- Message:
  ```
  Hello {customerName},
  
  Your appointment is confirmed:
  
  Date: {appointmentDate}
  Time: {appointmentTime}
  Location: {locationAddress}
  
  See you then!
  ```

### 4. Support Ticket Created

**Configuration**:
- Provider: Postmark
- Send to: `{userEmail}, support@company.com`
- Subject: `Support Ticket #{ticketNumber} Created`
- Message:
  ```
  Ticket #{ticketNumber} has been created.
  
  Issue: {issueDescription}
  Priority: {ticketPriority}
  
  We'll respond within 24 hours.
  ```

---

## Best Practices

### Email Content

**DO**:
- Keep emails concise and focused
- Use clear, professional language
- Include all relevant information
- Personalize with user variables
- Provide next steps or actions

**DON'T**:
- Send unnecessarily long emails
- Include sensitive information in plain text
- Use all caps or excessive formatting
- Send generic, impersonal messages

### Subject Lines

**DO**:
- Make them descriptive and specific
- Keep under 60 characters
- Include key information (order #, ticket #)
- Use variables for personalization

**DON'T**:
- Use vague subjects ("Update", "Notification")
- Exceed 60 characters (may be cut off)
- Use all caps or excessive punctuation
- Be misleading or clickbait-y

### Recipients

**DO**:
- Verify email addresses are valid
- Use variables from user input
- Test with real email addresses
- Consider privacy and consent

**DON'T**:
- Hardcode sensitive addresses in production
- Send to unverified addresses
- Include BCC recipients without consent
- Send unsolicited emails

---

## Provider Setup

### Postmark Configuration

**Steps**:
1. Create account at postmarkapp.com
2. **Verify sender email**:
   - Add your domain or email
   - Complete verification process (DNS records or email confirmation)
3. **Generate API token**:
   - Go to Servers -> API Tokens
   - Create new token
   - Copy the token
4. **Configure in component**:
   - Provider: Postmark
   - Sender email: your-verified-email@yourdomain.com
   - API Key: (paste your token)

**Why Postmark?**
- High deliverability rates
- Real-time delivery tracking
- Bounce and spam handling
- Detailed analytics
- Reliable infrastructure

### Intalos Email Service

**Steps**:
1. Select "contact@intalos.de" in the Email component
2. You'll see a warning: "Please contact contact@intalos.de for the Intalos AI email Pass Key"
3. Contact contact@intalos.de to request your Pass Key
4. Enter the Pass Key in the component

**About This Service**:
- Managed email service provided by Intalos
- Pass Keys are provided on request
- Simple setup - no need to configure external email providers
- Suitable for users who prefer a managed solution

---

## Error Handling

### Error Output Port

Route the conversation when email sending fails:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow to your error handling flow
3. Handle scenarios like:
    - Invalid recipient email
    - API key errors
    - Network failures
    - Provider issues

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   We couldn't send the confirmation email. Please contact support.
   ```

### Admin Email Notification

Get notified when email sending fails:

1. Toggle **"Admin email when error"** to ON
2. Notifications sent to your registered admin email
3. Includes error details for debugging

---

## Technical Details

### Email Formatting

- **Content type**: HTML
- **Encoding**: UTF-8
- **Rich text**: Supported via editor
- **Plain text fallback**: Automatically generated

### Variable Substitution

Variables are replaced before sending:
- Subject line variables
- Message body variables
- Recipient address variables
- All `{variableName}` patterns replaced

### Delivery

- **Sending**: Asynchronous (doesn't block bot flow)
- **Timeout**: 30 seconds
- **Retries**: Automatic for transient failures
- **Tracking**: Delivery status logged

### Size Limits

- **Subject**: 255 characters recommended
- **Message body**: No strict limit, but keep under 100 KB
- **Recipients**: Up to 50 addresses per email
- **Attachments**: Not currently supported

---

## Security & Privacy

### Email Privacy

**DO**:
- Only send emails to users who provided consent
- Use secure API keys
- Store API keys as environment variables
- Follow data privacy regulations (GDPR, CCPA)

**DON'T**:
- Share API keys in screenshots or documentation
- Send emails without user consent
- Include passwords or sensitive data in emails
- Store API keys in version control

### API Key Security

- **Never share** your Postmark API key
- **Regenerate keys** if compromised
- **Use separate keys** for testing and production
- **Monitor usage** in Postmark dashboard

---

## Troubleshooting

### Issue: Emails not sending

**Check**:
- API key is correct and active
- Sender email is verified in Postmark
- Recipient emails are valid
- No typos in email addresses

### Issue: Emails going to spam

**Solution**:
- Verify your sender domain in Postmark
- Add SPF and DKIM records to your DNS
- Use professional, clear email content
- Avoid spam trigger words

### Issue: Variables not replacing

**Check**:
- Variable names match exactly (case-sensitive)
- Variables exist and have values
- Syntax is correct: `{variableName}`

### Issue: Error "Invalid API key"

**Solution**:
- Verify API key in Postmark dashboard
- Check for extra spaces in key
- Ensure key is active and not expired
- Regenerate key if needed

### Issue: "Sender email not verified"

**Solution**:
- Complete email/domain verification in Postmark
- Check verification status
- Add DNS records if using domain verification

---

## Advanced Tips

### Dynamic Recipients

Use APIRequest to fetch email addresses, then send:
```
APIRequest (get customer email)
\--> Store in {customerEmail}
    \--> Email component sends to {customerEmail}
```

### Conditional Emails

Send different emails based on conditions:
```
Formula (check order size)
|-- Large orders -> Email to {userEmail}, sales-manager@company.com
\-- Small orders -> Email to {userEmail}
```

### Email with Data Collection

Combine user input with email notifications:
```
QuestionText (collect feedback)
\--> Store in {userFeedback}
    \--> Email to support@company.com with {userFeedback}
```

---

## Common Patterns

### Order Confirmation Flow

```
Process Order -> Email (to customer) -> Email (to fulfillment team)
```

### Support Ticket System

```
Collect Issue -> Create Ticket (APIRequest) -> Email (to user + support team)
```

### Lead Capture

```
Collect Info -> Email (to sales team) -> Confirmation message to user
```

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: October 20, 2025

