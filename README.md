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
1. Install dependencies
```
npm install
```
2. Run the development server
```
npm run dev
```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Guide
## P(ostgres) E(xpress.js) R(eact.js) N(ode.js)
**Postgres** - relational db\
**Express.js** - web framework (API)\
**React.js** - frontend library\
**Node.js** - allows javascript to run server-side (js runtime)

## Setup
```
npm init -y
npm i express dotenv cors helmet morgan @neondatabase/serverless @arcjet/node
npm i typescript ts-node nodemon -D
```

**helmet** - middleware to protect the app by setting HTTP headers\
**morgan** - log requests

### Backend
1. server.ts
2. /routes - create a route file
2. /controllers - create a controller file

> [!CAUTION]
> TODO: replace raw sql with orm (drizzle?)
