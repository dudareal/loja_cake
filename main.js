document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".products");
  const newCollectionContainer = document.querySelector(".new-collection .products");

  // Função para criar card de bolo
  function createCakeCard(cake) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${cake.image}" alt="${cake.name}">
      <div class="info">
        <h3>${cake.name}</h3>
        <p class="price">R$ ${cake.price.toFixed(2)}</p>
        <p class="description">${cake.description}</p>
        <input type="text" placeholder="Seu nome" class="comment-user">
        <input type="text" placeholder="Comentário" class="comment-text">
        <input type="number" min="1" max="5" placeholder="Nota 1-5" class="comment-rating">
        <button class="btn-comment">Comentar</button>
        <ul class="comments-list">
          ${cake.comments.map(c => `<li>${c.user}: ${c.text} ⭐${c.rating}</li>`).join('')}
        </ul>
      </div>
    `;

    const btnComment = card.querySelector(".btn-comment");
    btnComment.addEventListener("click", () => {
      const user = card.querySelector(".comment-user").value;
      const text = card.querySelector(".comment-text").value;
      const rating = Number(card.querySelector(".comment-rating").value);

      fetch(`/cakes/${cake.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, text, rating })
      })
      .then(res => res.json())
      .then(comment => {
        const ul = card.querySelector(".comments-list");
        const li = document.createElement("li");
        li.textContent = `${comment.user}: ${comment.text} ⭐${comment.rating}`;
        ul.appendChild(li);

        card.querySelector(".comment-user").value = '';
        card.querySelector(".comment-text").value = '';
        card.querySelector(".comment-rating").value = '';
      });
    });

    return card;
  }

  // Buscar bolos do servidor
  fetch("/cakes")
    .then(res => res.json())
    .then(data => {
      data.forEach(cake => {
        if (cake.id <= 3) {
          productsContainer.appendChild(createCakeCard(cake));
        } else {
          newCollectionContainer.appendChild(createCakeCard(cake));
        }
      });
    });
});
