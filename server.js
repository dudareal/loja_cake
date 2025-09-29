const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(__dirname));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


let cakes = [
  { id: "1", name: "Bolo de Morango", price: 65, description: "Bolo de massa branca com recheio de morango e nata. Peso: 1kg", image: "assets/bolo-morango.webp", comments: [] },
  { id: "2", name: "Bolo de Brigadeiro", price: 55, description: "Bolo de massa de chocolate com recheio de brigadeiro. Peso: 1,5kg", image: "assets/bolo-brigadeiro.webp", comments: [] },
  { id: "3", name: "Bolo de Pêssego", price: 70, description: "Bolo de massa branca com recheio de geleia de pêssego e chantilly. Peso: 2kg", image: "assets/bolo-pessego.webp", comments: [] },
  { id: "4", name: "Bolo de Pistache com Brigadeiro", price: 240, description: "Bolo de massa de chocolate com recheio de brigadeiro de pistache e brigadeiro de cacau. Peso: 1,3kg", image: "assets/bolo-pistache.webp", comments: [] },
  { id: "5", name: "Bolo Red Velvet", price: 99.9, description: "Bolo de massa vermelha com recheio de cream cheese e frutas vermelhas. Peso: 1,5kg", image: "assets/redvelvet.webp", comments: [] }
];


app.get("/cakes", (req, res) => {
  res.json(cakes);
});


app.post("/cakes/:id/comments", (req, res) => {
  const { id } = req.params;
  const cake = cakes.find(c => c.id === id);
  if (!cake) return res.status(404).json({ error: "Bolo não encontrado" });

  const comment = {
    id: uuid(),
    user: req.body.user,
    text: req.body.text,
    rating: req.body.rating,
    date: new Date()
  };

  cake.comments.push(comment);
  res.json(comment);
});

app.listen(5000, () => console.log("Servidor rodando em http://localhost:5000"));
