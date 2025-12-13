import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./db.js";
import chatRoutes from "./routes/chatRoutes.js";
import {fileURLToPath} from url;

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.get("/general", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api", chatRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
