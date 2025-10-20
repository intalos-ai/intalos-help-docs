# APIRequest Component

## Overview

The **APIRequest** component allows you to connect your WhatsApp bot to external APIs and web services. Use it to fetch data from your CRM, validate information, send data to third-party services, or integrate with any HTTP-based API.

## When to Use APIRequest

Perfect for scenarios like:
- Fetching user data from your CRM or database
- Validating customer information with external services
- Sending collected data to third-party platforms
- Synchronizing data between systems
- Routing conversations based on API responses

---

## Configuration

### Adding Query Parameters

Query parameters are added to the end of your URL (e.g., `?search=test&limit=10`)

1. Toggle **"Send Params"** to ON
2. Click **"Add Parameter"**
3. Enter the parameter name (Key) and value
4. Repeat for multiple parameters

**Example**:
```
Key: search        Value: {searchTerm}
Key: limit         Value: 10
Key: includeEmail  Value: true
```

**Variables in Parameters**: Use `{{variableName}}` syntax:
```
Key: userId    Value: {{customerID}}
```

### Custom Headers

Headers are used for authentication and content type specification.

1. Toggle **"Customize Headers"** to ON
2. Click **"Add Header"**
3. Enter header name and value

**Common Examples**:
```
Key: Authorization    Value: Bearer YOUR_API_KEY
Key: Content-Type     Value: application/json
Key: X-API-Key        Value: {apiKey}
```

### Request Body (POST/PUT)

Send data in the request body for POST and PUT requests.

1. Toggle **"Customize Body"** to ON
2. Enter your JSON data in the editor

**Example**:
```json
{
  "name": "{{userName}}",
  "email": "{{userEmail}}",
  "phone": "{{userPhone}}"
}
```

**Body Variables**: Use `{{variableName}}` syntax for variables in the body.

---

## Testing Your API Call

Before deploying, test your API request:

1. Toggle **"Add test values"** to ON
2. Add test values for any variables:
   ```
   Variable: {userName}    Test Value: John Doe
   Variable: {userEmail}   Test Value: john@example.com
   ```
3. Click **"Test the request"** button
4. Review the response in the popup modal

A successful test shows:
- Status code (e.g., 200)
- Response headers
- Response body

---

## Response Routing

Route your conversation flow based on API response status codes.

1. Toggle **"Response Routing"** to ON
2. Connect output arrows from your component:
   - Label each arrow with a status code (`200`, `404`, `500`, etc.)
   - Add a "default" arrow for unlisted status codes

**Example Flow**:
```
APIRequest -> 200 -> Success Message
          -> 404 -> "User not found" Message
          -> default -> Error Handling
```

---

## Storing API Responses

Save API responses in variables to use later in your flow.

1. Scroll to **"Store output in variable"**
2. Type a variable name or select an existing one
   ```
   Example: apiResponse
   ```

**Access response data in later components**:
```
Status Code: {apiResponse.status_code}
Response Text: {apiResponse.text}
JSON Data: {apiResponse.json.fieldName}
```

---

## Error Handling

### Error Output Port

When enabled, creates a separate path for errors:

1. Toggle **"Error Output Port"** to ON
2. Connect the error arrow (marked with warning icon) to error handling components

### Error Message to User

Send a custom message when errors occur:

1. Toggle **"Error Message to User"** to ON
2. Enter your message:
   ```
   We're having trouble connecting to our system. Please try again later.
   ```

**Dynamic Error Messages**: Use variables in error messages:
```
Sorry {userName}, we couldn't process your request. Error: {errorDetails}
```

### Admin Email Notification

Get notified when API errors occur:

1. Toggle **"Send Error Admin Email"** to ON
2. Errors will be sent to your registered admin email

---

## Variable Reference Guide

### Using Variables in URLs
```
Syntax: {variableName}
Example: https://api.example.com/users/{userId}/orders/{orderId}
```

### Using Variables in Parameters
```
Syntax: {{variableName}}
Example:
  Key: search    Value: {{searchTerm}}
```

### Using Variables in Headers
```
Syntax: {variableName}
Example:
  Key: Authorization    Value: Bearer {apiToken}
```

### Using Variables in Body
```
Syntax: {{variableName}}
Example:
{
  "user": "{{userName}}",
  "action": "{{userAction}}"
}
```

---

## Common Use Cases

### 1. Fetch User Profile from CRM

**Configuration**:
- Method: `GET`
- URL: `https://your-crm.com/api/users/{phoneNumber}`
- Store in: `userProfile`

**Usage in next component**:
```
Welcome back, {userProfile.json.firstName}!
Your account status: {userProfile.json.status}
```

### 2. Validate Email Address

**Configuration**:
- Method: `POST`
- URL: `https://api.emailvalidation.com/validate`
- Body:
  ```json
  {
    "email": "{{userEmail}}"
  }
  ```
- Response Routing: ON
  - 200 -> "Email is valid"
  - 400 -> "Invalid email format"

### 3. Create Support Ticket

**Configuration**:
- Method: `POST`
- URL: `https://your-helpdesk.com/api/tickets`
- Headers:
  ```
  Authorization: Bearer YOUR_API_KEY
  Content-Type: application/json
  ```
- Body:
  ```json
  {
    "subject": "{{ticketSubject}}",
    "description": "{{ticketDescription}}",
    "customer_phone": "{{userPhone}}"
  }
  ```

### 4. Update Customer Preferences

**Configuration**:
- Method: `PUT`
- URL: `https://api.yourservice.com/customers/{customerId}/preferences`
- Body:
  ```json
  {
    "newsletter": {{subscribeNewsletter}},
    "notifications": {{enableNotifications}}
  }
  ```

---

## Best Practices

### Security
**DO**:
- Store API keys in environment variables
- Use HTTPS endpoints only
- Implement proper authentication headers
- Test with non-production data first

**DON'T**:
- Hardcode sensitive credentials in the component
- Use HTTP (non-secure) for sensitive data
- Skip error handling

### Performance
**DO**:
- Keep API calls efficient and targeted
- Use response routing to handle failures gracefully
- Set appropriate timeout expectations
- Store frequently used data in variables

**DON'T**:
- Make unnecessary API calls in loops
- Fetch large datasets without pagination
- Ignore rate limits

### User Experience
**DO**:
- Provide clear error messages
- Show loading indicators (in error messages)
- Handle all possible response codes
- Test thoroughly before deployment

**DON'T**:
- Leave users hanging without feedback
- Show technical error messages to users
- Assume APIs will always work

---

## Troubleshooting

### Issue: "Variable not found" error

**Solution**: Make sure the variable exists before the APIRequest component:
1. Check if the variable is set in a previous component
2. Verify variable name spelling matches exactly
3. Use the test values feature to simulate the variable

### Issue: API request fails with 401/403

**Solution**: Authentication problem:
1. Check your API key is correct
2. Verify the Authorization header format
3. Ensure the API key has proper permissions
4. Check if the API requires additional headers

### Issue: Request timeout

**Solution**: The API is taking too long (30-second limit):
1. Optimize the API endpoint on your server
2. Reduce the amount of data being transferred
3. Consider using webhooks instead for long operations

### Issue: Variables not being replaced

**Solution**: Check variable syntax:
- URLs: Use `{variableName}`
- Parameters: Use `{{variableName}}`
- Body: Use `{{variableName}}`
- Ensure no extra spaces in variable names

### Issue: JSON parsing error in body

**Solution**: Invalid JSON format:
1. Validate your JSON using an online validator
2. Check for missing commas or quotes
3. Ensure proper quote escaping
4. Test without variables first, then add them

---

## Important Notes

### API Endpoint Whitelisting

**Important**: If your API has firewall restrictions, you must whitelist our backend server:

```
Hostname to whitelist: https://magic.intalos.de
```

Contact your IT team to add this to your API's allowed origins.

### Response Format

The API response is stored with this structure:
```javascript
{
  "status_code": 200,
  "headers": { ... },
  "text": "raw response text",
  "json": { ... }  // Only if response is JSON
}
```

### Timeout Limits

- **Maximum timeout**: 30 seconds
- Requests taking longer will fail with a timeout error
- For long-running operations, consider using webhooks

---

## Need Help?

Email: contact@intalos.de

---

**Last Updated**: October 20, 2025


