import express from "express";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/tts", (req, res) => {
  const text = req.body.text;
  console.log("Generating:", text);

  // Call the Python wrapper that uses tiktok_voice
  const py = spawn("python", ["tts_runner.py", text]);

  let chunks = [];
  py.stdout.on("data", (data) => chunks.push(data));
  py.stderr.on("data", (d) => console.error("Python error:", d.toString()));

  py.on("close", () => {
    const audioBuffer = Buffer.concat(chunks);
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audioBuffer);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
