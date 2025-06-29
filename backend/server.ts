import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import productRoutes from "./routes/productRoutes.ts";
import { sql } from "./config/db.ts";
import { aj } from "./lib/arcjet.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        res.status(429).json({ success: false, message: "Too Many Requests" });
      else if (decision.reason.isBot())
        res.status(403).json({ success: false, message: "Bot Access Denied" });
      else res.status(403).json({ success: false, message: "Forbidden" });

      return;
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ success: false, message: "Spoofed Bot Detected" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("frontend/dist", "index.html"));
  });
}

const initDB = async () => {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    description VARCHAR(255),
    tags VARCHAR(255),
    expires_at DATE,
    best_before DATE,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

    console.log("Successfully Initialized Database");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
};

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// app.get("/test", (req, res) => {
//   res.send({ message: "HELLO WORLD!" });
// });
