# Vite Debug and Build Process

This project uses [Vite](https://vitejs.dev/) for development and building.

## Debug Process

1. **Install dependencies**  
    ```bash
    npm install
    ```
2. **Start development server**  
    ```bash
    npm run dev
    ```
    - Opens the app locally with hot module replacement.
    - Access the app at `http://localhost:5173` (default).

3. **Debugging tips**
    - Use browser dev tools for inspecting and debugging.
    - Console logs and breakpoints work as expected.

## Build Process

1. **Build for production**  
    ```bash
    npm run build
    ```
    - Generates optimized static files in the `dist/` directory.

2. **Preview production build**  
    ```bash
    npm run preview
    ```
    - Serves the built files locally for testing.

## Additional Commands

- **Clean install**  
  ```bash
  rm -rf node_modules && npm install
  ```
- **Open in browser**  
  ```bash
  "$BROWSER" http://localhost:5173
  ```

Refer to [Vite documentation](https://vitejs.dev/guide/) for advanced configuration.