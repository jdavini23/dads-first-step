# Contributing to Dad's First Step

## Development Workflow

### Branch Strategy
1. **Never commit directly to `main`**
2. Create feature branches from `main`
3. Use descriptive branch names:
   - `feature/add-milestone-tracking`
   - `bugfix/navigation-error`
   - `refactor/update-auth-system`

### Commit Guidelines
- Make small, focused commits
- Limit commits to < 50 changed files
- Use conventional commit format:
  ```
  <type>(scope): <description>
  
  [optional body]
  
  [optional footer]
  ```

#### Commit Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

### Pull Request Process
1. Open a PR from your feature branch to `main`
2. Ensure all CI checks pass
3. Request a review from at least one team member
4. Squash and merge after approval

## Code Quality

### Linting and Formatting
- Run `npm run lint` before committing
- Use provided `.eslintrc` and `.prettierrc`
- Fix all linting errors before committing

### Testing
- Write tests for new features
- Maintain > 80% test coverage
- Run `npm test` before committing

## Sensitive Information
- **NEVER** commit:
  - API keys
  - Passwords
  - Personal credentials
- Use `.env.example` as a template
- Store secrets in secure environment variables

## Performance and Best Practices
- Optimize imports
- Use code splitting
- Minimize bundle size
- Follow React and Next.js best practices

## Troubleshooting
- If you encounter merge conflicts, communicate with the team
- Use the migration scripts in `/scripts`
- Consult documentation before making significant changes

## Questions?
Reach out to the project maintainers for guidance.
