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
    - **[helmet](https://www.npmjs.com/package/helmet)** - middleware to protect the app by setting HTTP headers\
    - **[morgan](https://www.npmjs.com/package/morgan)** - log requests\
    - **[neon](https://neon.com/docs/guides/node)** - database\
    - **[arcjet](https://arcjet.com/)** - security
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

> [!CAUTION]
> TODO: replace raw sql with orm (drizzle?)
