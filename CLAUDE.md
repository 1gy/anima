# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `pnpm install`
- **Format code (includes lint + import organization)**: `pnpm -F @1gy/anima-app format`
- **Type check**: `pnpm -F @1gy/anima-app typecheck`
- **Run tests**: `pnpm -F @1gy/anima-app test:run`
- **Pre-commit check**: `pnpm -F @1gy/anima-app pre-commit`

### Code Quality Tools

**Biome v2** handles code formatting, linting, and import organization:
- Format command: `biome check --write .` (runs format + lint + import organizer)
- Supports monorepo configuration with nested configurations
- Import organizer automatically sorts and merges imports

### Required Pre-Commit Process

**ALWAYS run this command before any commit:**
```bash
pnpm -F @1gy/anima-app pre-commit
```

This command runs format → typecheck → test in sequence.
If any step fails, fix the issues before committing.

## Git Workflow

For detailed branch strategy and development workflow:
@docs/development-workflow.md

## Commit Convention

Follow Conventional Commits format with English body text. See CONTRIBUTING.md for details.

Example:
```
feat: add new feature

Detailed description of the new feature in English
```

## Project Structure

This is a pnpm monorepo workspace with Biome v2 configured for linting, formatting, and import organization.

- Uses pnpm workspaces (configured in `pnpm-workspace.yaml`)
- **Biome v2**: Unified code quality tool (format + lint + import organizer)
- **Monorepo support**: Root configuration with package-specific overrides
- Configured for TypeScript/TSX files in `src/` directories
- Package manager: pnpm@10.12.1

### Biome Configuration Structure

- **Root**: `biome.jsonc` - Common rules and settings
- **Packages**: Individual `biome.jsonc` files with `"extends": "//"` for inheritance
- **File targeting**: Each package specifies its own `files.includes` patterns

## Project Information

@docs/requirements.md

For contributing guidelines and commit conventions:
@CONTRIBUTING.md

For development session recording guidelines:
@docs/dev-session-guidelines.md

For development workflow with Claude Code:
@docs/development-workflow.md

## Technical Documentation

Architecture and design decisions:
@docs/architecture.md

Coding style and conventions:
@docs/coding-style.md

Testing strategy and guidelines:
@docs/testing-strategy.md

React hooks best practices and useEffect guidelines:
@docs/react-hooks-guide.md

## Documentation Guidelines

**All documentation should be discoverable from CLAUDE.md**

When creating new documentation:
1. Add reference links from CLAUDE.md to ensure discoverability
2. Use `@path/to/file.md` format for references
3. Group related documents under appropriate sections
4. Especially important for documents containing Claude Code instructions