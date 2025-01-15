# GitHub Secrets Configuration Guide

## Required Secrets for Dad's First Step Workflows

### 1. Firebase Secrets

- `FIREBASE_TOKEN`: Used for Firebase CLI authentication
  - Generate with: `firebase login:ci`
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
  dads-first-step
- `FIREBASE_API_KEY`: Firebase API key from project settings

### 2. Security Scanning Alternatives

### GitHub Native Security Tools

- **No additional tokens required**
- Uses GitHub CodeQL and Dependency Review
- Free for public repositories
- Comprehensive vulnerability scanning

### Optional: Slack Webhook

- For notifications on security scan failures
- Generate from Slack App settings
- Not mandatory for security scanning

### 3. Deployment Secrets

- `NPM_TOKEN`: (Optional) For private npm registry access
- `VERCEL_TOKEN`: (Optional) Alternative deployment token

### 4. Notification Secrets

- `SLACK_WEBHOOK`: Slack webhook for CI/CD notifications
  - Create in Slack App settings

## How to Add Secrets

1. Go to your GitHub repository
2. Click "Settings"
3. Select "Secrets and variables" > "Actions"
4. Click "New repository secret"
5. Add each secret with its corresponding value

### Example Secret Addition

```
Name: FIREBASE_TOKEN
Secret: your-firebase-token-here
```

## Security Best Practices

- Never commit secrets to the repository
- Rotate secrets periodically
- Use environment-specific secrets
- Limit secret access to necessary workflows

## Troubleshooting

- Verify secret names match workflow references
- Check GitHub Actions logs for secret-related errors
- Ensure tokens have correct permissions

### Required Workflow Secrets

- [ ] FIREBASE_TOKEN
- [ ] FIREBASE_PROJECT_ID
- [ ] FIREBASE_API_KEY
- [ ] SLACK_WEBHOOK (Optional)
