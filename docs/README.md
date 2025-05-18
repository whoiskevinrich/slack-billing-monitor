# Wikr Slack Billing Monitor

This repository provides an AWS CDK v2-based TypeScript project for monitoring AWS billing and sending notifications to Slack. It is designed with SOLID and clean code principles, and leverages modern TypeScript tooling and best practices.

## Features

- **AWS CDK v2**: Infrastructure as code for AWS resources.
- **TypeScript**: Strongly-typed codebase for reliability and maintainability.
- **Vitest**: Fast, modern unit testing framework.
- **pnpm**: Efficient package management.
- **CI/CD**: GitHub Actions for continuous integration and deployment.
- **Linting & Formatting**: ESLint and Prettier for code quality.
- **Commitizen & semantic-release**: Conventional commits and automated changelogs.
- **Documentation**: Markdown, Mermaid.js diagrams, and Marp presentations.

## Project Structure

- `src/` - Application source code
- `packages/` - Reusable packages and constructs
- `bin/` - CDK app entrypoint
- `cdk.json` - CDK configuration
- `tsconfig.json` - TypeScript configuration
- `vitest.config.ts` - Vitest configuration
- `docs/` - Documentation, diagrams, and presentations

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Build the project**
   ```sh
   pnpm run build
   ```
3. **Run tests**
   ```sh
   pnpm test
   ```
4. **Deploy to AWS**
   ```sh
   pnpm cdk deploy
   ```

## Contributing

- Follow SOLID and clean code principles.
- Write and update documentation in `docs/`.
- Use ESLint and Prettier for code style.
- Use commitizen for commit messages.
- All changes should be covered by unit tests (Vitest).

## Documentation & Diagrams

- Add architectural diagrams in `docs/diagrams/` using Mermaid.js.
- Add presentations in `docs/presentations/` using Marp.

## License

[MIT](../LICENSE)
