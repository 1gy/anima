# Contributing to Anima

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) format.

### Format

```
<type>: <subject>

<body in English>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **perf**: A code change that improves performance
- **ci**: Changes to CI/CD configuration
- **chore**: Changes to the build process or auxiliary tools and libraries

### Examples

```
feat: add anime comparison feature

Add anime comparison functionality for users
- Fetch user data from AniList API
- Display common watched anime list
- Store settings in localStorage
```

```
fix: resolve type error in anime list component

Fix type error in anime list component
- Add undefined checks for better type safety
- Improve strict mode compatibility
```

### Guidelines

- Keep subject concise and in English (50 characters or less recommended)
- Write body in English with detailed description
- Focus on why the change was made, not what was changed
- Include `BREAKING CHANGE:` in the body for breaking changes

### Commit Units

Commit in **meaningful atomic units**.

- One logical change per commit
- Separate changes with different purposes
- Keep the build in a working state
- Maintain reviewable granularity

**Good examples:**
- Separate feature addition from configuration changes
- Separate dependency addition from implementation
- Keep documentation updates in separate commits

**Bad examples:**
- Combine multiple features in one commit
- Include unrelated fixes in the same commit

## Development Session Recording

Document development sessions with Claude Code for knowledge transfer and process transparency.

- See [Development Session Guidelines](docs/dev-session-guidelines.md) for detailed rules
- Record sessions at major milestones and after significant commits
- Use format: `docs/dev-sessions/YYYY-MM-DD-session-topic.md`
- Include conversation flow, key decisions, and technical notes