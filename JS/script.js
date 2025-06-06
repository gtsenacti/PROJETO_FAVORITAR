
//Lista de produtos para teste
const listaProdutos = [
  {
    id: 1,
    nome: "Espelho retrovisor",
    descricao: "Epelho retrovisor interno, modelo 76400-SEA-004.",
    imagem: "Imagens/espelhoRetrovisor.jpg"
  },
  {
    id: 2,
    nome: "Pneu aro 16",
    descricao: " Marca Westlake Sport 205/45R16, modelo PR4 87W XL T.",
    imagem: "Imagens/pneu16.jpg"
  },
  {
    id: 3,
    nome: "Calota",
    descricao: "Calota Calotinha Centro Miolo Tampa Roda BBS, BRW900 Prata.",
    imagem: "Imagens/calota.jpg"
  }
];

//Para a página index.html
const container = document.getElementById('produtos');

if (container) {
  listaProdutos.forEach(produto => {
    const div = document.createElement('div');
    div.classList.add('produto');
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <button class="favoritar" onclick='favoritar(${JSON.stringify(produto)})'>Favoritar ❤️</button>
    `;
    container.appendChild(div);
  });
}

function favoritar(produto) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (!favoritos.find(p => p.id === produto.id)) {
    favoritos.push(produto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert("Produto favoritado!");
  } else {
    alert("Produto já está nos favoritos!");
  }
}

//Funções para a página favoritos.html
function carregarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const container = document.getElementById('favoritos');
  container.innerHTML = "";

  if (favoritos.length === 0) {
    container.innerHTML = "<p>Nenhum produto favoritado.</p>";
    return;
  }

  favoritos.forEach((produto) => {
    const div = document.createElement('div');
    div.classList.add('produto');
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <button class="remover" onclick="removerFavorito(${produto.id})">Remover ❌</button>
    `;
    container.appendChild(div);
  });
}

function removerFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(p => p.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  carregarFavoritos();
}

carregarFavoritos();