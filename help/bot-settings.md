# Bot Settings

## Overview

**Bot Settings** allow you to configure integrations and features that apply to your entire bot, rather than individual components in your flow. These settings enable advanced capabilities like IoT device control, API integrations, and other bot-wide configurations.

---

## Available Settings Tabs

Bot Settings are organized into four main tabs:

### 1. General Settings

Configure general bot-wide settings:
- **Enable Manual Restart**: Allow manual restart of bot conversations (default: enabled)
- Other general bot configuration options

### 2. Variables

Manage bot variables and their types:
- View all variables used in your bot
- Set variable types (string, number, boolean, array, object, date, auto-detect)
- Variables are automatically created when you use them in components
- System variables (created automatically) vs user variables
- Edit variable types to ensure proper data handling
- Delete unused variables

**Note**: Variables are created automatically when you reference them in components. You can manage their types here to ensure correct data processing.

### 3. Payment Integrations

Configure payment processor integrations:
- **Payment Processor Integration**: Enable/disable payment processing
- **Yoco Integration**: Configure Yoco payment webhooks
  - Webhook Secret
  - Yoco Webhook Payment Identifier
- **Payfast Integration**: Configure Payfast payment settings
- **Payment Integration Meta Data**: View payment integration metadata
- **Webhook Response Processing**: Configure how payment webhook responses are processed
  - Google Sheets integration for payment data

### 4. IoT Integration

Configure smart device control and home automation:

- **[Tuya IoT Integration](tuya-integration.md)** - Control smart devices via Tuya Smart Life platform

---

## How to Access Bot Settings

1. **Open your bot** in the Bot Builder
2. Click on **"Bot Settings"** (usually in the top navigation or sidebar)
3. Navigate to the relevant tab:
   - **General**: General bot settings
   - **Variables**: Manage bot variables
   - **Payment Integrations**: Configure payment processors
   - **IoT Integration**: Configure smart device control
4. Configure your settings
5. **Save** your changes

---

## Important Notes

### Settings vs Components

**Settings** are bot-wide configurations that:
- Apply to the entire bot
- Don't appear as components in your flow diagram
- Enable features that can be used throughout your bot
- Require authentication/credentials

**Components** are individual steps in your bot flow that:
- Appear in your flow diagram
- Can be added, removed, and connected
- Have their own configuration panels
- Process specific tasks

### Security

All bot settings include:
- Secure credential storage (encrypted)
- Per-bot isolation (settings don't leak between bots)
- Rate limiting and cooldown protection
- Session management

---

## Need Help?

**Email**: contact@intalos.de

**Common Questions**:
- How do I access bot settings? Click "Bot Settings" in your bot builder
- Can settings be shared between bots? No, each bot has its own settings
- Are settings secure? Yes, all credentials are encrypted and stored securely

---

**Last Updated**: January 2025

