#!/bin/bash
set -eu

mkdir -p /home/vscode/.claude
chown -R vscode /home/vscode/.claude

mkdir -p /home/vscode/.pnpm
chown -R vscode /home/vscode/.pnpm
