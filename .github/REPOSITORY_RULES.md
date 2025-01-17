# Repository Protection and Governance Rules

## Branch Protection Strategies

### Main Branch (`main`)
- 🔒 **Strict Protection Enabled**
- Requires at least 1 approved review
- Enforces linear commit history
- Blocks force pushes
- Prevents branch deletion

### Feature Branches
- Requires at least 1 code review
- Encourages collaborative development

## Security Measures
- Signed commits required
- Dependabot alerts enabled
- Continuous security scanning
- Restricted push access

## Workflow Automation
- Auto-merge for minor dependency updates
- Comprehensive status checks before merging

## Compliance Guidelines
1. All contributions must pass:
   - Linting checks
   - Unit tests
   - Build verification
   - Security scans

2. Commit signing is mandatory
3. Maintain clean, linear git history

## How to Contribute
- Create feature branches from `main`
- Open pull requests with clear descriptions
- Ensure all checks pass before requesting review
- Collaborate and provide constructive feedback
