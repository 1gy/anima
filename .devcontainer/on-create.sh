#!/bin/bash
set -eu

sudo mkdir -p /home/vscode/.local/share/claude
sudo chown -R vscode /home/vscode/.local/share/claude
