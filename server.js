import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api/movies";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/movies", async (req, res) => {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const movies = data.data; 

    res.render("movies", { movies });
  } catch (err) {
    res.status(500).render("error", { message: "Kunde inte hämta filmer." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
