# Token Generation Guide

## Firebase Token Generation

### Prerequisites
1. Install Firebase CLI globally
   ```powershell
   npm install -g firebase-tools
   ```

2. Login to Firebase
   ```powershell
   firebase login
   ```
   - This will open a browser window
   - Select your Google account
   - Grant necessary permissions

3. Generate CI Token
   ```powershell
   firebase login:ci
   ```
   - Copy the generated token
   - DO NOT share this token publicly

### Finding Firebase Project Details

1. Open Firebase Console
2. Select your project
3. Go to Project Settings (gear icon)
4. Find:
   - Project ID
   - Web API Key
   - Project Number

### Example Firebase Project Details
```
Project ID: dads-first-step
API Key: AIza...
Project Number: 123456789
```

## Snyk Token Generation

1. Create Snyk Account
   - Go to https://snyk.io/
   - Sign up or log in

2. Get Authentication Token
   - Go to Account Settings
   - Navigate to "API Tokens"
   - Generate a new token
   - Copy the token

## Slack Webhook (Optional)

1. Create Slack App
   - Go to https://api.slack.com/apps
   - Click "Create New App"
   - Choose "From scratch"

2. Add Incoming Webhooks
   - Go to "Incoming Webhooks"
   - Turn on "Activate Incoming Webhooks"
   - Click "Add New Webhook to Workspace"
   - Choose a channel
   - Copy the Webhook URL

## Security Recommendations

- Store tokens securely
- Never commit tokens to repository
- Rotate tokens periodically
- Use GitHub Secrets for storage

## Troubleshooting

- Ensure you have necessary permissions
- Check token scopes
- Verify token validity
- Regenerate if compromised
