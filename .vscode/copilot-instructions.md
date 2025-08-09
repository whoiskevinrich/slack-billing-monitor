We want others to be able to understand our code:
- Always include the comments and documentation for generated code. 
- Maintain architectural and design diagrams in the doc/diagrams directory using mermaid.js. 
- Use markdown for documentation. 
- Use marp for presentations and put them in the docs/presentations folder. 

Use TypeScript for code:
- Use Vitest for testing. 
- Use pnpm for package management. 
- Use AWS CDK v2 for infrastructure. 
- Use SOLID principles for design. 
- Use clean code principles for implementation. 
- Use best practices for security and performance. 
- Use GitHub Actions for CI/CD. 
- Use ESLint and Prettier for code formatting and linting. 
- Use commitizen for commit messages. 
- Use semantic-release for versioning and changelogs.

We want maintainable code:
- add JSDoc @deprecated tags to outdated functions to provide clear deprecation warnings in code editors.

We want clean code tests:
- test suites requiring changes to environment variables should ensure the environment is reset before and after the tests to avoid side effects.
- use `beforeEach` and `afterEach` hooks to set up and tear down the environment for each test case.
- use `describe` blocks to group related tests together for better organization and readability.