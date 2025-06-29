# Project Setup
## Clone the project
```
git clone https://github.com/emjheypb/pern-stack.git
```
## Edit the .env file
Copy .env.example to .env and fill in the appropriate values.
```
cp .env.example .env
```

## Getting Started
1. Navigate to /pern-stack/frontend
```
cd pern-stack/frontend
```
2. Install dependencies
```
npm install
```
3. Run the development server
```
npm run dev
```
4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

# Guide
1. Vite Setup *React, Typescript*
```
cd frontend
npm create vite@latest .
npm i
```
2. [Tailwind Setup](https://tailwindcss.com/docs/installation/using-vite)
3. [DaisyUI Setup](https://daisyui.com/docs/install/) (recommended: apply [themes](https://daisyui.com/docs/themes/))
4. Install other dependencies:
    - **[react-hot-toast](https://react-hot-toast.com/)** - toast notifications
    - **[react-router-dom](https://reactrouter.com/)** - navigation
    - **[axios](https://axios-http.com/docs/intro)** - API calls
    - **[zustand](https://zustand-demo.pmnd.rs/)** - global states
    - **[lucide-react](https://lucide.dev/guide/packages/lucide-react)** - icons
```
npm i react-hot-toast react-router-dom axios zustand lucide-react
```
5. Implement react-router-dom in main.tsx
6. /pages
7. /components
8. /constants
9. /store
