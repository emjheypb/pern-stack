import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(res.getHeaders());
});
