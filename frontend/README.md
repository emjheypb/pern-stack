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
2. [https://tailwindcss.com/docs/installation/using-vite]Tailwind Setup
3. [https://daisyui.com/docs/install/]DaisyUI Setup (recommended: apply [https://daisyui.com/docs/themes/]themes)
4. Install other dependencies:
    - **[https://react-hot-toast.com/]react-hot-toast** - toast notifications
    - **[https://reactrouter.com/]react-router-dom** - navigation
    - **[https://axios-http.com/docs/intro]axios** - API calls
    - **[https://zustand-demo.pmnd.rs/]zustand** - global states
    - **[https://lucide.dev/guide/packages/lucide-react]lucide-react** - icons
```
npm i react-hot-toast react-router-dom axios zustand lucide-react
```
5. Implement react-router-dom in main.tsx
6. /pages
7. /components