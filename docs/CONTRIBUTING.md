# Contributing to SelectCareOS

Thank you for your interest in contributing to SelectCareOS! This document provides guidelines and instructions for contributing.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Code Review](#code-review)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Fork & Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/selectcareos.git
cd selectcareos

# Add upstream remote
git remote add upstream https://github.com/germanselect/selectcareos.git
```

---

## Development Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .dev.vars

# Build the project
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Run tests
./test-api.sh
./test-pages.sh
```

---

## Making Changes

### Branch Naming
Use descriptive branch names:
- `feature/doctor-dashboard-calendar`
- `fix/booking-validation`
- `docs/api-reference`
- `refactor/service-structure`

### Creating a Branch
```bash
# Update main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### File Organization

When adding new features:

1. **Pages** go in `src/pages/`
   - One file per page
   - Export a single function that returns HTML string

2. **Services** go in `src/services/`
   - Business logic and data handling
   - Use TypeScript classes or modules

3. **Types** go in `src/types/index.ts`
   - Add new interfaces/types to the central file
   - Document with JSDoc comments

4. **Routes** go in `src/index.tsx`
   - Add route handlers
   - Import page functions and services

### Code Style

```typescript
// Use explicit types
function getDoctorById(id: string): Doctor | null {
  // Implementation
}

// Use async/await for promises
async function fetchData(): Promise<Data> {
  const response = await api.get('/data');
  return response.data;
}

// Handle errors properly
try {
  const result = await service.process(data);
  return c.json({ success: true, data: result });
} catch (error) {
  console.error('Error:', error);
  return c.json({ success: false, error: 'Processing failed' }, 500);
}
```

---

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
git commit -m "feat(doctor-dashboard): add online booking calendar"
git commit -m "fix(booking): validate date range before submission"
git commit -m "docs(api): add instant-connect endpoint documentation"
```

---

## Pull Request Process

### Before Submitting

1. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   ./test-api.sh
   ./test-pages.sh
   ```

3. **Build successfully**
   ```bash
   npm run build
   ```

4. **Update documentation** if needed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] API tests pass
- [ ] Page tests pass
- [ ] Manual testing done

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

---

## Code Review

### For Authors
- Respond to feedback promptly
- Be open to suggestions
- Ask questions if unclear
- Update PR based on feedback

### For Reviewers
- Be constructive and specific
- Explain the "why" behind suggestions
- Approve when requirements are met
- Test changes locally if possible

### Review Checklist
- [ ] Code follows project conventions
- [ ] Types are properly defined
- [ ] Error handling is adequate
- [ ] No security vulnerabilities
- [ ] Tests are included/updated
- [ ] Documentation is updated

---

## Questions?

- Open an issue for bugs or features
- Start a discussion for questions
- Check existing issues before creating new ones

---

*Thank you for contributing to SelectCareOS!*
