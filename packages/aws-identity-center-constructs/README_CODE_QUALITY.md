# aws-identity-center-constructs: Code Quality & Refactoring Progress

This file tracks code quality suggestions, best practices, and progress on improvements for this module.

## Suggestions & To-Do

### 1. Type Safety and Consistency

- [x] Refactor `tags` property in `PermissionSetProps` to use `Record<string, string>` or `Array<Record<string, string>>` as appropriate. (2025-08-09)

### 2. Optional Properties

- [x] Review and ensure all optional properties are handled safely and consistently. (2025-08-09)

### 3. Immutability

- [ ] Mark properties as `readonly` where possible.

### 4. Validation Methods

- [ ] Ensure validation methods throw meaningful errors and are covered by unit tests.
- [ ] Consider extracting validation logic into utility functions or a separate class.

### 5. Documentation

- [ ] Add JSDoc comments to all public classes, interfaces, and methods.

### 6. Test Coverage

- [ ] Ensure all validation and edge cases are covered by tests.

### 7. Imports

- [ ] Review import style for consistency and readability.

---

## Progress Log

- **2025-08-09**: Initial review and suggestions added.

---

Add notes and check off items as improvements are made.
