# GitHub Actions Workflows

## Continuous Integration (CI)
![CI Status](https://github.com/jdavini23/dads-first-step/workflows/CI/badge.svg)

Our CI workflow ensures code quality and builds the project:
- Runs on every push and pull request
- Lints code
- Runs tests
- Builds the project

### Workflow Triggers
- Push to `develop` and `main` branches
- Pull requests to `develop` and `main`

## Security Scanning
![Security Scan](https://github.com/jdavini23/dads-first-step/workflows/Security%20Scan/badge.svg)

Weekly security vulnerability checks:
- Uses Snyk for dependency scanning
- Integrates GitHub CodeQL analysis
- Identifies potential security risks

### Scanning Schedule
- Runs every Sunday at midnight (PST)
- Can be manually triggered

## Dependency Review
![Dependency Review](https://github.com/jdavini23/dads-first-step/workflows/Dependency%20Review/badge.svg)

Checks dependency changes in pull requests:
- Blocks PRs with high-severity vulnerabilities
- Ensures safe dependency updates

## Deployment
![Deploy](https://github.com/jdavini23/dads-first-step/workflows/Deploy/badge.svg)

Automatic deployment workflow:
- Deploys to Firebase Hosting
- Triggered on merges to `main`
- Includes environment-specific configurations

## How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make changes
4. Run local tests
5. Push and create a pull request

## Workflow Status
Check the [Actions tab](https://github.com/jdavini23/dads-first-step/actions) for current workflow statuses.
