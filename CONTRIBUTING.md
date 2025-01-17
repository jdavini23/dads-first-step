# Contributing to Dad's First Step

## 🤝 How to Contribute

We welcome contributions from the community! This document provides guidelines for contributing to the project.

### 📋 Prerequisites

- Node.js (v18+)
- npm or Yarn
- Git
- Basic understanding of TypeScript and React

### 🚀 Getting Started

1. Fork the repository
2. Clone your forked repository
   ```bash
   git clone https://github.com/your-username/dads-first-step.git
   cd dads-first-step
   ```
3. Install dependencies
   ```bash
   npm install
   ```

### 🌿 Branch Strategy

- `main`: Stable production branch
- `develop`: Active development branch
- Feature branches: `feature/your-feature-name`
- Bugfix branches: `bugfix/issue-description`

### 🔧 Development Workflow

1. Create a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run linting and tests
   ```bash
   npm run lint
   npm test
   ```
4. Commit changes following conventional commit format
   ```
   <type>(scope): <description>
   
   [optional body]
   ```
   Example: `feat(milestones): add new milestone tracking feature`

### 📝 Commit Message Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code restructuring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 🧪 Testing

- Write unit tests for new features
- Ensure 80%+ test coverage
- Use descriptive test names
- Test both happy paths and edge cases

### 🔍 Code Review Process

1. Open a pull request with a clear title and description
2. Include screenshots for UI changes
3. Ensure all CI checks pass
4. Wait for at least one reviewer's approval

### 🛡️ Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Collaborate and support each other

### 📢 Reporting Issues

- Use GitHub Issues
- Provide detailed description
- Include steps to reproduce
- Attach relevant logs or screenshots

## 🏆 Thank You!

Your contributions make this project better. We appreciate your help!
