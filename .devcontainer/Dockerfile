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

# Set terminal environment variables
ENV TERM=xterm-256color
SHELL ["/bin/bash", "-c"]
RUN echo 'export TERM=xterm-256color' >> ~/.bashrc && \
    echo 'alias ll="ls -alF"' >> ~/.bashrc && \
    echo 'alias la="ls -A"' >> ~/.bashrc && \
    echo 'alias l="ls -CF"' >> ~/.bashrc && \
    echo 'export PS1="\[\e[32m\]\u@\h:\[\e[34m\]\w\[\e[0m\]\$ "' >> ~/.bashrc && \
    echo 'if [ -f ~/.bash_completion ]; then . /etc/bash_completion; fi' >> ~/.bashrc

# add git completion support
RUN curl -o ~/.git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash && \
    echo "source ~/.git-completion.bash" >> /root/.bashrc

#add cli formatting for git
RUN curl -o ~/.git-prompt.sh https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh && \
    echo "source ~/.git-prompt.sh" >> /root/.bashrc && \
    echo "export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\[\033[01;33m\]$(__git_ps1 " (%s)")\[\033[00m\]\$ '" >> /root/.bashrc

# Set work directory
WORKDIR /workspace

# Default command: start a shell
CMD [ "/bin/bash" ]