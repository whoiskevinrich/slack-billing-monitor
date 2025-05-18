# Contributing Guidelines

Thank you for considering contributing to this project!

## How to Contribute

- **Code Style**: Use TypeScript, follow SOLID and clean code principles.
- **Testing**: All new code must be covered by unit tests using Vitest.
- **Commits**: Use [Commitizen](https://commitizen-tools.github.io/commitizen/) for commit messages.
- **Documentation**: Update or add documentation in the `docs/` directory as needed.
- **CI/CD**: Ensure all GitHub Actions workflows pass before submitting a PR.

## Development Workflow

1. Fork and clone the repository.
2. Create a new branch for your feature or bugfix.
3. Install dependencies with `pnpm install`.
4. Make your changes, add/modify tests, and update docs.
5. Run `pnpm run build` and `pnpm test` to verify.
6. Commit using `pnpm cz` (Commitizen).
7. Push your branch and open a pull request.

## Code Quality

- Use ESLint and Prettier for linting and formatting.
- Keep functions and files small and focused.
- Write clear comments and documentation.

## Diagrams & Presentations

- Add/update architecture diagrams in `docs/diagrams/` (use Mermaid.js).
- Add/update presentations in `docs/presentations/` (use Marp).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
