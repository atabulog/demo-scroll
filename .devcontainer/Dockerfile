FROM ubuntu:24.04

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    nodejs \
    npm \
    nano \
    && rm -rf /var/lib/apt/lists/*

# Install esbuild globally
RUN npm install -g esbuild serve

# Enable Git coloring globally
RUN git config --global color.ui auto

# Add bash completion + git prompt support
RUN echo "if [ -f /etc/bash_completion ]; then . /etc/bash_completion; fi" >> /etc/bash.bashrc \
    && echo "source /usr/share/bash-completion/completions/git" >> /etc/bash.bashrc \
    && echo "parse_git_branch() { git branch 2>/dev/null | grep '^*' | colrm 1 2; }" >> /etc/bash.bashrc \
    && echo "PS1='\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\[\\033[01;33m\\]\$(parse_git_branch)\\[\\033[00m\\]$ '" >> /etc/bash.bashrc

ENV TERM=xterm-256color

# Set work directory
WORKDIR /workspace

# Default command: start a shell
CMD [ "bash" ]