// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const { fetchItem } = require("./helpers/fetchItem");

const itemsSection = document.getElementsByClassName('items')[0];
// console.log(itemsSection);
const carrinho = document.getElementsByClassName('cart__items')[0];
// console.log(carrinho);
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const cartItemClickListener = (event) => {
  const listaCart = document.querySelector('ol');
  const itemToRemove = event.target;
  itemToRemove.id = 'remover';
  const elemento = document.getElementById('remover');
  if (elemento.parentNode) {
    elemento.parentNode.removeChild(elemento);
  }
  return listaCart;
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
 const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', function (event) {
    cartItemClickListener(event);
  });
  return li;
};

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const objetoAdicionar = async () => {
  const arrayItemAdd = document.querySelectorAll('.item__add');  
  arrayItemAdd.forEach(async (btn) => {
    btn.addEventListener('click', async (event) => {
      // console.log(event.target);
      const idTarget = event.target.parentElement.firstChild.innerText;
      // console.log(idTarget);
      const objeto = await fetchItem(idTarget);    
      carrinho.appendChild(createCartItemElement(objeto));
    });
  });
};
// objetoAdicionar();

const criarLista = async (end) => {
  const objeto = await fetchProducts(end);
  const arrayItems = objeto.results;
  // console.log(arrayItems);
  arrayItems.forEach((item) => {
    itemsSection.appendChild(createProductItemElement(item));
  });
  await objetoAdicionar();
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

window.onload = () => { 
  criarLista('item');
};
