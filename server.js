// Express server: serves the built React app (dist/) and is the place for future API routes.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "dist");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ---- API routes go here ----
app.get("/api/health", (req, res) => {
  res.json({ ok: true, app: "AayuAcademy" });
});

// ---- Static files + React app ----
app.use(express.static(dist));

// Any other URL (/courses, /profile ...) gets index.html so React Router can handle it.
app.use((req, res) => {
  res.sendFile(path.join(dist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`AayuAcademy running at http://localhost:${PORT}`);
});
