import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Placeholder for advanced RAG implementation
  app.post("/api/rag/query", (req, res) => {
    // In the future, this endpoint will connect to a vector database
    // (e.g., Pinecone, Weaviate) to retrieve relevant consultancy knowledge
    // before passing it back to the frontend to augment the Gemini prompt.
    const { query } = req.body;
    res.json({ 
      status: "success", 
      message: "RAG endpoint ready for integration.",
      context: "This is a placeholder for retrieved knowledge."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
