import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados em memória (teste)
let cakes = [
  { id: "1", name: "Bolo de Morango", price: 65.00, description: "Bolo de massa branca com recheio de morango.", image: "assets/bolo-morango.webp", comments: [] },
  { id: "2", name: "Bolo de Brigadeiro", price: 55.00, description: "Bolo de chocolate com brigadeiro.", image: "assets/bolo-brigadeiro.webp", comments: [] },
];

// 📌 Rota para listar todos os bolos
app.get("/cakes", (req, res) => {
  res.json(cakes);
});

// 📌 Rota para adicionar um novo bolo
app.post("/cakes", (req, res) => {
  const { name, price, description, image } = req.body;
  const newCake = { id: uuidv4(), name, price, description, image, comments: [] };
  cakes.push(newCake);
  res.status(201).json(newCake);
});

// 📌 Rota para adicionar comentário e avaliação a um bolo
app.post("/cakes/:id/comments", (req, res) => {
  const { id } = req.params;
  const { user, text, rating } = req.body; // rating de 1 a 5
  const cake = cakes.find(c => c.id === id);

  if (!cake) {
    return res.status(404).json({ error: "Bolo não encontrado" });
  }

  const newComment = {
    id: uuidv4(),
    user,
    text,
    rating: Math.max(1, Math.min(5, rating)), // garante entre 1 e 5
    date: new Date()
  };

  cake.comments.push(newComment);
  res.status(201).json(newComment);
});

// 📌 Rota para pegar comentários de um bolo
app.get("/cakes/:id/comments", (req, res) => {
  const { id } = req.params;
  const cake = cakes.find(c => c.id === id);

  if (!cake) {
    return res.status(404).json({ error: "Bolo não encontrado" });
  }

  res.json(cake.comments);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
