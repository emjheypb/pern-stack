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
1. Navigate to /pern-stack
```
cd pern-stack
```
2. Install dependencies
```
npm install
```
3. Run the development server
```
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# PERN Guide
**P ostgres** - relational db\
**E xpress.js** - web framework (API)\
**R eact.js** - frontend library\
**N ode.js** - allows javascript to run server-side (js runtime)

## Backend
1. Install dependencies
    - **[https://www.npmjs.com/package/helmet]helmet** - middleware to protect the app by setting HTTP headers\
    - **[https://www.npmjs.com/package/morgan]morgan** - log requests\
    - **[https://neon.com/docs/guides/node]neon** - database\
    - **[https://arcjet.com/]arcjet** - security
```
npm init -y
npm i express dotenv cors helmet morgan @neondatabase/serverless @arcjet/node
npm i typescript ts-node nodemon -D
```

1. server.ts
2. /routes - create a route file
3. /controllers - create a controller file
4. /config/db.ts - SQL connection (initialize in server.ts; apply to routes and controllers)
5. /controllers - create db functions
6. /routes - create endpoints accessing db functions
7. /lib/arcjet.ts - security services (implement in server.ts)

## Frontend
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

> [!CAUTION]
> TODO: replace raw sql with orm (drizzle?)
