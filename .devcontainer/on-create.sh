#!/bin/bash
set -eu

# Setup Claude Code configuration directory
mkdir -p /home/vscode/.claude
chown -R vscode /home/vscode/.claude

# Setup pnpm cache directory for persistence
mkdir -p /home/vscode/.pnpm
chown -R vscode /home/vscode/.pnpm
