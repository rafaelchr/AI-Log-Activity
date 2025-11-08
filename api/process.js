import express from "express";
import cors from "cors";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

console.log("📍 Running API from:", __dirname);
console.log(
  "🔍 GEMINI_API_KEY:",
  process.env.GEMINI_API_KEY ? "Loaded ✅" : "❌ Not found"
);

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateLog(req, res) {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Teks tidak boleh kosong" });
    }

    console.log("Diterima input:", text);

    const resultSchema = {
      type: Type.OBJECT,
      properties: {
        uraian_aktivitas: {
          type: Type.STRING,
        },
        pembelajaran_diperoleh: {
          type: Type.STRING,
        },
        kendala_dialami: {
          type: Type.STRING,
        },
      },
      propertyOrdering: [
        "uraian_aktivitas",
        "pembelajaran_diperoleh",
        "kendala_dialami",
      ],
    };

    const prompt = `
      Saya adalah orang yang bergerak di bidang IT (Information Technology)
      Dan kamu akan berperan sebagai asisten pembuat log aktivitas profesional.

      Analisis teks aktivitas saya berikut dan bagi menjadi tiga bagian:
      1. Uraian Aktivitas
      2. Pembelajaran yang Diperoleh
      3. Kendala yang Dialami

      Setiap bagian minimal 100 karakter.

      Instruksi tambahan: 
      - Tulis seolah kamu benar-benar melakukan aktivitas tersebut dari awal hingga akhir.
      - Jelaskan proses langkah demi langkah, termasuk apa yang dipelajari, tools yang digunakan, dan apa yang dihasilkan.
      - Pada bagian “Pembelajaran”, jangan hanya jelaskan hal teknis, tapi juga insight umum seperti pola berpikir, konsep pemecahan masalah, dan peningkatan kemampuan logika.
      - Pada bagian “Kendala”, sertakan masalah teknis umum yang sering dialami orang ketika melakukan aktivitas tersebut serta bagaimana kamu mengatasinya.
      - Gunakan gaya bahasa natural, reflektif, dan objektif, seolah ditulis oleh mahasiswa magang atau peserta proyek akhir yang mencatat perkembangannya.
      - Jangan gunakan notasi-notasi readme

      Teks: "${text}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resultSchema,
      },
    });

    const output = response.text.trim();

    let jsonOutput;
    try {
      jsonOutput = JSON.parse(output);
    } catch {
      jsonOutput = { raw: output };
    }

    return res.status(200).json(jsonOutput);
  } catch (error) {
    console.error("Terjadi error di endpoint /api/process:", error);
    return res.status(500).json({ error: err.message });
  }
}

app.post("/api/process", generateLog);

app.get("/api/process", (req, res) => {
  res.send("Server API berjalan dengan baik!");
});

const PORT = 3000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
