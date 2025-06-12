# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `pnpm install`
- **Lint code**: `pnpm biome lint`
- **Format code**: `pnpm biome format --write`
- **Check formatting**: `pnpm biome check`
- **Format app package**: `pnpm -F @1gy/anima-app format`

## Commit Convention

Follow Conventional Commits format with English body text. See CONTRIBUTING.md for details.

Example:
```
feat: add new feature

Detailed description of the new feature in English
```

## Project Structure

This is a pnpm monorepo workspace with Biome configured for linting and formatting.

- Uses pnpm workspaces (configured in `pnpm-workspace.yaml`)
- Biome handles linting, formatting, and import organization
- Configured for TypeScript/TSX files in `src/` directories
- Package manager: pnpm@10.12.1

The workspace is currently minimal with no packages defined yet.

## Project Information

@docs/requirements.md

For contributing guidelines and commit conventions:
@CONTRIBUTING.md

For development session recording guidelines:
@docs/dev-session-guidelines.md

For development workflow with Claude Code:
@docs/development-workflow.md