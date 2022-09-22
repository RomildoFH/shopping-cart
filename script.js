// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const saveCartItems = require("./helpers/saveCartItems");

// const { fetchItem } = require("./helpers/fetchItem");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const itemsSection = document.getElementsByClassName('items')[0];
// console.log(itemsSection);
const carrinho = document.getElementsByClassName('cart__items')[0];
// console.log(carrinho);

const lista = document.querySelector('.cart__items');

const savedItems = getSavedCartItems();

const btnClear = document.getElementsByClassName('empty-cart')[0];

const subtotalDiv = document.querySelector('.subtotal');

const searchImput = document.getElementById('search');

const btnSearch = document.getElementById('btn-search');

const moveTop = document.getElementById('move-up');

const header = document.getElementById('header');

const cartIcon = document.getElementsByClassName('material-icons')[0];

const cartContainer = document.querySelector('.cart');

const cartTitle = document.querySelector('.container-cartTitle');

// ------------------------------------------------------------
// Utilizando o for of e o async para realizar o somatório de todos os preços de forma assíncrona
// const getCartItemsIDs = () => {
//   const lis = document.querySelectorAll('.cart__item');
//   // console.log(lis);
//   const arrayIDs = [];
//   lis.forEach((element) => {    
//     arrayIDs.push(element.innerText.split(' ')[1]);
//   });
//   return (arrayIDs);
// };

// const getProductsPrice = async () => {
//   const arrayPrices = [];  
//   const arrayIds = getCartItemsIDs();
//   // console.log(arrayIds);
//   // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
//   for (const index of arrayIds) {
//     const url = `https://api.mercadolibre.com/items/${index}`;
//     // console.log(url);
//     const promessa = await fetch(url);
//     const data = await promessa.json();
//     const price = await data.price;
//     arrayPrices.push(price);
//   }
//   return (arrayPrices);
// };

// function round(value, decimals) {
//   return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
// }

// const getTotalPrice = async () => {
//   const arrayPrices = await getProductsPrice();
//   let totalPrice = 0;
//   for (let index = 0; index < arrayPrices.length; index += 1) {
//     totalPrice += arrayPrices[index];
//     totalPrice = round(totalPrice, 2);
//   }
//   return (totalPrice);
// };

// const totalPrice = async () => {
//   const price = await getTotalPrice();
//   if (document.querySelector('.total-price')) {
//     document.querySelector('.total-price').remove();
//   }
//   const paragraph = document.createElement('p');
//   paragraph.classList = 'total-price';
//   paragraph.innerText = `Total price: ${price}`;
//   subtotalDiv.appendChild(paragraph);
// };
// ------------------------------------------------------------

// ------------------------------------------------------------
// Refatorando o código referente ao total price para obedecer o lint

const hideMenu = () => {
  cartIcon.addEventListener('click', () => {
    const classModify = 'close-cart-items';
    cartContainer.classList.toggle(classModify);
    cartTitle.classList.toggle(classModify);
    if (cartTitle.classList.contains(classModify)) {
      setTimeout(() => {
        cartContainer.style.display = 'none';
        cartTitle.style.display = 'none';
      }, 200);
    } else {
      setTimeout(() => {
        cartContainer.style.display = 'flex';
        cartTitle.style.display = 'flex';                
      }, 200);
    }
  });
};
hideMenu();

const moveUp = () => {
  moveTop.addEventListener(('click'), () => {
    header.scrollIntoView({ behavior: 'smooth' });
  });
};

const getCartItemsPrices = () => {
  const lis = document.querySelectorAll('.cart__item');
  // console.log(lis);
  const arrayPrices = [];
  lis.forEach((element) => {    
    const string = element.innerText.split('$')[1];
    const number = parseFloat(string.replace(',', '.'));
    arrayPrices.push(number);
  });
  return (arrayPrices);
};
// https://stackoverflow.com/questions/3163070/javascript-displaying-a-float-to-2-decimal-places
function round(value, decimals) {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}

const getTotalPrice = () => {
  const arrayPrices = getCartItemsPrices();
  let totalPrice = 0;
  for (let index = 0; index < arrayPrices.length; index += 1) {
    totalPrice += arrayPrices[index];
    totalPrice = round(totalPrice, 2);
  }
  return (totalPrice);
};

const totalPrice = () => {
  const price = getTotalPrice();
  if (document.querySelector('.total-price')) {
    document.querySelector('.total-price').remove();
  }
  const paragraph = document.createElement('p');
  paragraph.classList = 'total-price';
  paragraph.innerText = `Total price: ${price}`;
  subtotalDiv.appendChild(paragraph);
};
// ------------------------------------------------------------

const getClickedItem = () => {
  const arrayLi = [];
  for (let index = 0; index < carrinho.childNodes.length; index += 1) {
    if (index > 0) {
    arrayLi.push(`%${carrinho.childNodes[index].innerText}`);
    } else {
      arrayLi.push(`${carrinho.childNodes[index].innerText}`);
    }
  }
  // console.log(arrayLi);
  saveCartItems(arrayLi);
};

const cartItemClickListener = async (event) => {
  const listaCart = document.querySelector('ol');
  const itemToRemove = event.target.parentNode;
  itemToRemove.id = 'remover';
  // console.log(event.target);
  // https://developer.mozilla.org/pt-BR/docs/Web/API/Node/removeChild
  const elemento = document.getElementById('remover');
  if (elemento.parentNode) {
    elemento.parentNode.removeChild(elemento);
    getClickedItem();
  }
  await totalPrice();
  return listaCart;
};

const liContainer = (objeto) => {
  const liCont = document.createElement('div');
  liCont.className = 'cartItem-div';
  liCont.id = `li-${objeto.id}`;
  return liCont;
};

const liContainerSaved = (id) => {
  const liCont = document.createElement('div');
  liCont.className = 'cartItem-div';
  liCont.id = `li-${id}`;
  return liCont;
};

const liTextSaved = (string) => {
  const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `${string}`;
    li.addEventListener('click', function (event) {
    cartItemClickListener(event);
  });
  return li;
};

const carregaLista = () => {
  if (localStorage.cartItems) {
    const arrayItems = savedItems.split(',%');
    for (let index = 0; index < arrayItems.length; index += 1) {      
      const id = arrayItems[index].split(' ')[1];
      const divContainer = liContainerSaved(id);            
      lista.appendChild(divContainer);
      divContainer.appendChild(liTextSaved(arrayItems[index]));
    }
  }
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const creatCartItemImg = ({ thumbnail }) => {
  const imageContainer = document.createElement('img');
  imageContainer.src = thumbnail;
  imageContainer.className = 'img-cartItem';
  return imageContainer;
};

 const createCartItemElement = ({ id, title, price, thumbnail }) => {
  // const div = document.createElement('div');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', function (event) {
    cartItemClickListener(event);
  });
  // div.appendChild(creatCartItemImg(thumbnail));
  // div.appendChild(li);
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
      console.log(idTarget);
      const objeto = await fetchItem(idTarget);  
      console.log(objeto); 
      const divitem = carrinho.appendChild(liContainer(objeto));
      divitem.appendChild(creatCartItemImg(objeto)); 
      divitem.appendChild(createCartItemElement(objeto));
      saveCartItems(createCartItemElement(objeto));
      getClickedItem();
      await totalPrice();
    });
  });
};
// objetoAdicionar();

const loadingFunction = () => {
  const loadParagraph = document.createElement('p');
  loadParagraph.classList = 'loading';
  loadParagraph.innerText = 'carregando...';
  itemsSection.appendChild(loadParagraph);
};

const clearProducts = () => {
  while (itemsSection.childNodes.length > 0) {
    itemsSection.removeChild(itemsSection.firstChild);
  }
};

const criarLista = async (end) => {
  clearProducts();
  loadingFunction();
  const objeto = await fetchProducts(end);
  const arrayItems = objeto.results;
  // console.log(arrayItems);
  arrayItems.forEach((item) => {
    itemsSection.appendChild(createProductItemElement(item));
  });
  await objetoAdicionar();
  await totalPrice();
  document.querySelector('.loading').remove();
};

const searchProduct = () => {
  btnSearch.addEventListener('click', () => {
    const valorBuscado = (searchImput.value).toLowerCase();
    criarLista(valorBuscado);
  });
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const clearFunction = () => {
  btnClear.addEventListener('click', async () => {
    // alert('funfo');
    while (carrinho.childNodes.length > 0) {
      carrinho.removeChild(carrinho.firstChild);
    }
    getClickedItem();
    await totalPrice();
  });
};

window.onload = async () => {
  criarLista();
  await carregaLista();
  clearFunction();
  searchProduct();
  moveUp();
  await totalPrice();
};
