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

# Guide
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
