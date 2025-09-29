# BuyCake - Frontend

## 📋 Propósito do Serviço

Interface web do e-commerce BuyCake. Aplicação híbrida que utiliza React (via CDN) para componentes principais e JavaScript vanilla para integração com a API de produtos e comentários.

## 🎯 Funcionalidades

- Catálogo de produtos dinâmico carregado
- Sistema de comentários integrado com backend
- Carrossel automático de patrocinadores
- Vídeo de lançamento em destaque
- Seções separadas para produtos regulares e premium
- Sistema de carrinho de compras (React)
- Autenticação de usuários (React)
- Checkout com formulário de endereço (React)
- Design responsivo para mobile e desktop

## 🛠️ Tecnologias Utilizadas

### Parte React (index.html)
- **React 18** (via CDN) - Componentes de UI
- **Babel Standalone** - Compilação JSX no navegador
- **React Components**: Carousel, Header, Auth, Checkout, Comments

### Parte JavaScript Vanilla (main.js)
- **DOM Manipulation** - Criação dinâmica de cards de produtos
- **Event Listeners** - Interação com formulário de comentários

### Estilos
- **CSS3 puro** - Sem frameworks CSS
- **Google Fonts** - Playfair Display, Lora
- **Flexbox e Grid** - Layout responsivo

## 📦 Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Backend rodando em `http://localhost:5000`
- Conexão com internet (para CDNs do React e Google Fonts)

## 🚀 Configuração

### Estrutura de Arquivos

```
loja_cake/
├──.vscode
└── assets/            # Recursos visuais
    ├── logo.webp
    ├── ifood.webp
    ├── predilecta.webp
    ├── bauducco.webp
    ├── morangoamor.mp4
    ├── bolo-morango.webp
    ├── bolo-brigadeiro.webp
    ├── bolo-pessego.webp
    ├── bolo-pistache.webp
    └── redvelvet.webp
├── node_modules
├── index.html         # Página principal com componentes React
├── main.js            # JavaScript vanilla
├── package-lock.json
├── packagem.json
├── server.js
├── styles.css         # Todos os estilos

```

### Como Executar

O frontend é servido automaticamente pelo backend Express:

1. Inicie o servidor backend:
```bash
npm run start
```

2. Acesse no navegador:
```
http://localhost:5000
```

## 📡 Integração com API

### main.js - Carregamento de Produtos

O arquivo `main.js` faz requisições para a API e renderiza os produtos dinamicamente:

```javascript
// Busca produtos do backend
fetch("/cakes")
  .then(res => res.json())
  .then(data => {
    data.forEach(cake => {
      if (cake.id <= 3) {
        // Produtos regulares
        productsContainer.appendChild(createCakeCard(cake));
      } else {
        // Produtos premium (Bolos Virais)
        newCollectionContainer.appendChild(createCakeCard(cake));
      }
    });
  });
```

### Sistema de Comentários

Cada card de produto tem um mini-formulário para adicionar comentários:

```javascript
// Enviar comentário para API
fetch(`/cakes/${cake.id}/comments`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ user, text, rating })
})
.then(res => res.json())
.then(comment => {
  // Adicionar comentário na lista sem recarregar página
  const li = document.createElement("li");
  li.textContent = `${comment.user}: ${comment.text} ⭐${comment.rating}`;
  ul.appendChild(li);
});
```

## 🎨 Componentes

### React Components (index.html)

#### 1. **App** - Componente Principal
Gerencia estado global:
- `user` - Usuário logado
- `cart` - Itens no carrinho
- `showLogin` - Controle do modal de login
- `currentSection` - Navegação entre páginas
- `products` - Lista de produtos (hardcoded, usado como fallback)

#### 2. **Header**
- Logo
- Navegação (Home, Bolos Virais)
- Login/Logout
- Carrinho com contador de itens

#### 3. **Carousel**
- Slider automático de patrocinadores
- Transição a cada 5 segundos
- 3 slides: iFood, Predilecta, Bauducco

#### 4. **Products**
- Recebe array de produtos
- Renderiza cards com imagem, nome, preço, descrição
- Botão "Adicionar ao Carrinho"

#### 5. **Comments**
- Formulário para adicionar comentário
- Lista de comentários com avaliação em estrelas
- Armazenamento em memória (useState)

#### 6. **Auth**
- Modal de login/cadastro
- Alterna entre formulários
- Simula autenticação (apenas frontend)

#### 7. **Checkout**
- Exibe itens no carrinho
- Formulário de endereço
- Método de pagamento (Pix)
- Cálculo de total

### JavaScript Vanilla (main.js)

#### createCakeCard(cake)
Cria dinamicamente um card de produto com:
- Imagem do bolo
- Informações (nome, preço, descrição)
- Formulário de comentário
- Lista de comentários existentes
- Event listener para enviar comentário

## 🔧 Customização

### Alterar URL da API

Se o backend estiver em porta diferente, edite `main.js`:

```javascript
const API_URL = 'http://localhost:5000';

fetch(`${API_URL}/cakes`)
  // ...
```

## 📱 Responsividade

### Breakpoints

```css
@media (max-width: 768px) {
  /* Mobile */
  .home-layout { flex-direction: column; }
  .sponsors-sidebar { width: 100%; }
}
```

### Testado em:
- Chrome Desktop/Mobile
- Firefox Desktop/Mobile
- Safari Desktop/Mobile
- Edge Desktop

## 📞 Suporte

- **Repositório:** https://github.com/dudareal/loja_cake

**Frontend desenvolvido para BuyCake - E-commerce premium de bolos artesanais**