import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS (SSR templates)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static dist
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});