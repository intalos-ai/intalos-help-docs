# Tuya IoT Integration

## Overview

The **Tuya IoT Integration** allows you to control smart devices (lights, switches, sensors, etc.) from your WhatsApp bot using the Tuya Smart Life platform. Each bot can have its own Tuya account integration, enabling multiple users to control their own smart devices independently.

## When to Use Tuya Integration

Perfect for scenarios like:
- Controlling smart lights based on user preferences
- Managing home automation through WhatsApp
- Creating smart device status checkers
- Building voice-controlled device management
- Automating device responses to user messages

---

## Setup & Configuration

### 1. Enable Tuya Integration

1. Go to **Bot Settings** -> **IoT Integration** tab
2. Toggle **"Enable Tuya Integration"** to ON
3. Enter your Tuya Smart Life credentials:
   - **Username**: Your Tuya Smart Life account email
   - **Password**: Your Tuya Smart Life account password
   - **Country Code**: Select your country (e.g., +27 for South Africa)

### 2. Get Your Tuya Credentials

**Creating a Tuya Smart Life Account**:
1. Download the "Smart Life" app from your app store
2. Create an account using your email address
3. Add your smart devices to the app
4. Use the same email and password in your bot settings

**Supported Countries**:
- South Africa (+27)
- United States (+1)
- United Kingdom (+44)
- Germany (+49)
- France (+33)
- Italy (+39)
- Spain (+34)
- Australia (+61)
- China (+86)
- Japan (+81)
- South Korea (+82)

---

## Using Tuya Integration with API Request

### Getting Your Devices

**Step 1**: Add an **API Request** component to your bot flow

**Step 2**: Configure the API Request:
- **Method**: `GET`
- **URL**: `https://magic.intalos.de/api/tuya/devices/?bot_id={{botId}}`
- **Store in variable**: `myDevices`

**Step 3**: Use the device data in your next component:
```
Your available devices:
{myDevices.json.devices[0].name} - {myDevices.json.devices[0].type}
{myDevices.json.devices[1].name} - {myDevices.json.devices[1].type}
```

### Controlling Devices

**Step 1**: Add an **API Request** component

**Step 2**: Configure the API Request:
- **Method**: `POST`
- **URL**: `https://magic.intalos.de/api/tuya/devices/switch/`
- **Body**:
  ```json
  {
    "device_id": "{{deviceId}}",
    "action": "{{action}}",
    "bot_id": "{{botId}}"
  }
  ```
- **Store in variable**: `deviceResponse`

**Step 3**: Handle the response:
```
{deviceResponse.json.message}
```

---

## Common Use Cases

### 1. Turn On/Off Smart Lights

**Configuration**:
- **Method**: `POST`
- **URL**: `https://magic.intalos.de/api/tuya/devices/switch/`
- **Body**:
  ```json
  {
    "device_id": "{{lightDeviceId}}",
    "action": "{{lightAction}}",
    "bot_id": "{{botId}}"
  }
  ```

**Usage in conversation**:
```
User: "Turn on the living room lights"
Bot: "Turning on the living room lights..."
API Request: action = "on"
Bot: "[SUCCESS] Living room lights are now on!"
```

### 2. Check Device Status

**Configuration**:
- **Method**: `GET`
- **URL**: `https://magic.intalos.de/api/tuya/devices/?bot_id={{botId}}`
- **Store in**: `deviceStatus`

**Usage**:
```
Bot: "Checking your devices..."
API Request: Gets all devices
Bot: "[DEVICES] Your devices status:
- Living Room Light: {deviceStatus.json.devices[0].online ? 'Online' : 'Offline'}
- Bedroom Switch: {deviceStatus.json.devices[1].online ? 'Online' : 'Offline'}"
```

### 3. Smart Home Automation

**Configuration**:
- **Method**: `POST`
- **URL**: `https://magic.intalos.de/api/tuya/devices/switch/`
- **Body**:
  ```json
  {
    "device_id": "{{selectedDevice}}",
    "action": "{{userChoice}}",
    "bot_id": "{{botId}}"
  }
  ```

**Flow Example**:
```
Bot: "What would you like to control?"
User: "Turn off all lights"
Bot: "Turning off all lights..."
API Request: Loop through all light devices
Bot: "[SUCCESS] All lights have been turned off!"
```

---

## Device Management

### Finding Device IDs

1. **Get all devices** using the devices API endpoint
2. **Look for the `id` field** in the response
3. **Use the device name** to identify which device you want to control

**Example Response**:
```json
{
  "success": true,
  "devices": [
    {
      "id": "bf1234567890abcdef",
      "name": "Living Room Light",
      "type": "light",
      "online": true
    },
    {
      "id": "cd9876543210fedcba",
      "name": "Bedroom Switch",
      "type": "switch",
      "online": false
    }
  ]
}
```

### Device Types

Common Tuya device types include:
- **Light**: Smart bulbs, LED strips
- **Switch**: Smart switches, outlets
- **Sensor**: Motion sensors, temperature sensors
- **Camera**: Security cameras
- **Thermostat**: Temperature controllers
- **Fan**: Smart fans
- **Lock**: Smart door locks

---

## Error Handling

### Device Offline Error

When a device is offline, you'll receive:
```json
{
  "success": false,
  "error": "Device bf1234567890abcdef is offline and cannot be controlled"
}
```

**Handle this in your bot**:
```
Bot: "I tried to control your device, but it appears to be offline. 
Please check that the device is connected to your WiFi network."
```

### Authentication Error

If Tuya credentials are incorrect:
```json
{
  "success": false,
  "error": "Tuya credentials not configured for bot 123"
}
```

**Solution**: Check your bot settings and ensure Tuya integration is properly configured.

### Rate Limit / Cooldown Error (429)

When authentication is attempted too soon after a previous attempt:
```json
{
  "success": false,
  "error": "Too many authentication attempts. Please try again later.",
  "retry_after_seconds": 120
}
```

**What this means**: The Tuya API requires a 180-second cooldown between login attempts. Your bot tried to authenticate too soon after a previous attempt.

**How to handle**:
1. **Use response routing** in your API Request component to catch 429 errors
2. **Wait for the cooldown period** (check `retry_after_seconds` in the response)
3. **Retry the request** after the cooldown period expires
4. **Implement retry logic** in your bot flow using Formula or CustomCode components

**Example Bot Flow**:
```
APIRequest (control device) 
  → Response: 429 error?
  → Time Delay (wait for retry_after_seconds)
  → APIRequest (retry device control)
```

**Prevention**: The system automatically reuses authenticated sessions. Only re-authentication triggers the cooldown.

### Device Not Found Error

```json
{
  "success": false,
  "error": "Device invalid-device-id not found"
}
```

**Solution**: Verify the device ID exists in your device list.

---

## Best Practices

### Security
**DO**:
- Keep your Tuya credentials secure
- Use HTTPS endpoints only (already enforced)
- Test with non-critical devices first
- Monitor device access logs

**DON'T**:
- Share your Tuya credentials
- Control critical safety devices without proper testing
- Skip error handling for device operations

### Performance
**DO**:
- Cache device lists when possible
- Handle offline devices gracefully
- Use response routing for different outcomes
- Test device responses before deployment

**DON'T**:
- Make too many rapid device control requests
- Ignore device offline status
- Assume devices will always respond immediately

### User Experience
**DO**:
- Provide clear feedback on device status
- Handle offline devices with helpful messages
- Use device names instead of technical IDs in conversations
- Test all device interactions thoroughly

**DON'T**:
- Leave users wondering if their command worked
- Show technical error messages to users
- Assume all devices are always online

---

## Troubleshooting

### Issue: "Tuya integration not enabled" error

**Solution**: Enable Tuya integration in bot settings:
1. Go to Bot Settings -> IoT Integration
2. Toggle "Enable Tuya Integration" to ON
3. Enter your Tuya credentials
4. Save settings

### Issue: "Tuya credentials not configured" error

**Solution**: Check your credentials:
1. Verify your Tuya Smart Life email and password
2. Ensure the country code matches your account region
3. Test your credentials in the Smart Life app first

### Issue: Device appears offline

**Solution**: Check device connectivity:
1. Verify the device is connected to WiFi
2. Check the Smart Life app to confirm device status
3. Try controlling the device from the app first
4. Wait a few minutes and try again

### Issue: Device not responding to commands

**Solution**: Device may be busy or offline:
1. Check if the device is online in the Smart Life app
2. Try the command again after a few seconds
3. Verify the device ID is correct
4. Check if the device supports the requested action

### Issue: "Too many authentication attempts" (429 error)

**Solution**: You've hit the authentication cooldown:
1. **Wait 180 seconds** before retrying authentication
2. The system automatically reuses existing sessions - only new logins trigger cooldown
3. **Check `retry_after_seconds`** in the error response to know exactly when to retry
4. **Implement retry logic** in your bot flow to handle this gracefully
5. **Use response routing** in your API Request component to route 429 errors to a delay/retry flow

**Prevention Tips**:
- The system automatically manages session reuse
- Cooldown only applies when a new login is needed
- Normal device control operations don't trigger cooldown (they reuse existing sessions)

### Issue: "This endpoint is only accessible from internal requests" error

**Solution**: This is a security feature. The Tuya endpoints are only accessible from:
- The Intalos platform itself
- Internal server requests
- Production server (magic.intalos.de)

This error should not occur in normal bot operation.

---

## API Reference

### Get Devices
```
GET https://magic.intalos.de/api/tuya/devices/?bot_id={botId}
```

**Response**:
```json
{
  "success": true,
  "devices": [
    {
      "id": "device_id",
      "name": "Device Name",
      "type": "device_type",
      "online": true
    }
  ],
  "count": 1,
  "bot_id": "bot_id"
}
```

### Control Device
```
POST https://magic.intalos.de/api/tuya/devices/switch/
```

**Request Body**:
```json
{
  "device_id": "device_id",
  "action": "on|off",
  "bot_id": "bot_id"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "device_id": "device_id",
  "action": "on",
  "message": "Device device_id turned on successfully",
  "bot_id": "bot_id"
}
```

**Response (Rate Limit / Cooldown - 429)**:
```json
{
  "success": false,
  "error": "Too many authentication attempts. Please try again later.",
  "retry_after_seconds": 120
}
```

**Response (Service Unavailable - 503)**:
```json
{
  "success": false,
  "error": "Authentication failed",
  "bot_id": "bot_id"
}
```

---

## Important Notes

### Session Management & Cooldown Protection
- Tuya API sessions last 180 seconds (3 minutes)
- The system automatically manages session renewal
- **Cooldown Protection**: After a login attempt, you must wait 180 seconds before attempting to login again
- If you try to authenticate within the cooldown period, the API will return a `429 Too Many Requests` response with `retry_after_seconds`
- This prevents rate limiting issues with the Tuya API
- The system automatically reuses authenticated sessions when available
- Only new authentication attempts trigger the cooldown - normal device operations reuse existing sessions

**How Cooldown Works**:
- When your bot attempts to control a device, the system checks if authentication is needed
- If a recent login attempt was made (within 180 seconds), the system will return a 429 error
- The error response includes `retry_after_seconds` indicating how long to wait
- Your bot can handle this error and retry after the cooldown period

### Rate Limits
- Maximum 10 network requests per execution
- Built-in rate limiting prevents API abuse
- Requests are automatically throttled
- Authentication cooldown: 180 seconds between login attempts

### Security
- All Tuya endpoints are IP-restricted
- Only accessible from Intalos platform
- Credentials are stored securely per bot

### Device Compatibility
- Works with all Tuya Smart Life compatible devices
- Supports lights, switches, sensors, and more
- Device must be added to your Smart Life account first

---

## Need Help?

**Email**: contact@intalos.de

**Common Issues**:
- Device setup problems: Check Smart Life app
- Credential issues: Verify email/password
- Device offline: Check WiFi connection
- API errors: Contact support with bot ID

---

**Last Updated**: October 2025
