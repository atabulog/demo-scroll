FROM ubuntu:24.04

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies (curl, git, nano, bash completion)
RUN apt-get update && apt-get install -y \
    curl \
    git \
    nano \
    bash-completion \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (>=22.12) from NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Verify versions
RUN node -v && npm -v

# Install global utilities
RUN npm install -g esbuild serve

# Enable Git coloring globally
RUN git config --global color.ui auto

# Set terminal environment variables
ENV TERM=xterm-256color
SHELL ["/bin/bash", "-c"]

# Bashrc customization
RUN echo 'export TERM=xterm-256color' >> ~/.bashrc && \
    echo 'alias ll="ls -alF"' >> ~/.bashrc && \
    echo 'alias la="ls -A"' >> ~/.bashrc && \
    echo 'alias l="ls -CF"' >> ~/.bashrc && \
    echo 'if [ -f /etc/bash_completion ]; then . /etc/bash_completion; fi' >> ~/.bashrc

# Add Git completion + prompt
RUN curl -o /root/.git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash && \
    echo "source /root/.git-completion.bash" >> /root/.bashrc && \
    curl -o /root/.git-prompt.sh https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh && \
    echo "source /root/.git-prompt.sh" >> /root/.bashrc && \
    echo "export PS1='\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[31m\\]\$(__git_ps1 \" (%s)\")\\[\\033[00m\\]\\$ '" >> /root/.bashrc

# Set work directory
WORKDIR /workspace

# Default command: start a shell
CMD [ "/bin/bash" ]
