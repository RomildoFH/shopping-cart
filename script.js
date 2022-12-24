const itemsSection = document.getElementsByClassName('items')[0];
const carrinho = document.getElementsByClassName('cart__items')[0];
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
  let arrayPrices = [];
  const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
  if (savedCartItems !== null) {
    if (savedCartItems.length > 0) {
      arrayPrices = savedCartItems.map((element) => (element.price));
    }
  } else {
    arrayPrices = [];
  }
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
// Essa função adiciona os itens no localstorage
const getClickedItem = (objeto) => {
  const savedInCart = JSON.parse(localStorage.getItem('cartItems'));
  let arrayLi = savedInCart !== null ? savedInCart : [];
  for (let index = 0; index < carrinho.childNodes.length; index += 1) {
    if (index > 0) {
    arrayLi = [...savedInCart, objeto];
    } else {
      arrayLi = [objeto];
    }
  }
  saveCartItems(JSON.stringify(arrayLi));
};

const cartItemClickListener = async (event, objeto) => {
  const listaCart = document.querySelector('ol');
  const itemToRemove = event.target.parentNode;
  itemToRemove.id = 'remover';
  // https://developer.mozilla.org/pt-BR/docs/Web/API/Node/removeChild
  const elemento = document.getElementById('remover');
  const divToRemore = elemento.parentNode;
  const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
  if (elemento.parentNode) {
    divToRemore.parentNode.removeChild(divToRemore);
    console.log(objeto);
    localStorage.setItem('cartItems', JSON.stringify(savedCartItems
      .filter((element) => (element.id !== objeto.id))));
  }
  totalPrice();
  return listaCart;
};

const liContainer = (objeto) => {
  const liCont = document.createElement('div');
  liCont.className = 'cartItem-div';
  liCont.id = `li-${objeto.id}`;
  return liCont;
};

const liContainerSaved = ({ id, img }) => {
  const liCont = document.createElement('div');
  const image = document.createElement('img');
  image.src = img;
  liCont.className = 'cartItem-div';
  liCont.id = `li-${id}`;
  liCont.appendChild(image);
  return liCont;
};

const liTextSaved = (objeto) => {
  const { title, id, price } = objeto;
  const liTitle = document.createElement('p');
  liTitle.innerText = title;
  const liId = document.createElement('span');
  liId.innerText = `ID: ${id}`;
  const liPrice = document.createElement('span');
  liPrice.innerText = `$: ${price}`;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(liTitle);
  li.appendChild(liId);
  li.appendChild(liPrice);
  li.addEventListener('click', function (event) {
    cartItemClickListener(event, objeto);
  });
  return li;
};

const carregaLista = () => {
  if (localStorage.getItem('cartItems') !== null) {
    const arrayItems = JSON.parse(savedItems);
    for (let index = 0; index < arrayItems.length; index += 1) {      
      const item = arrayItems[index];
      const divContainer = liContainerSaved(item);
      lista.appendChild(divContainer);
      divContainer.appendChild(liTextSaved(arrayItems[index]));
    }
  }
};

const creatCartItemImg = (objeto) => {
  const imageContainer = document.createElement('img');
  imageContainer.src = objeto.thumbnail;
  imageContainer.className = 'img-cartItem';
  return imageContainer;
};

 const createCartItemElement = (objeto) => {
  const { id, title, price } = objeto;
  const liTitle = document.createElement('p');
  liTitle.innerText = title;
  const liId = document.createElement('span');
  liId.innerText = `ID: ${id}`;
  const liPrice = document.createElement('span');
  liPrice.innerText = `PRICE: $${price}`;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(liTitle);
  li.appendChild(liId);
  li.appendChild(liPrice);
  li.addEventListener('click', function (event) {
    cartItemClickListener(event, objeto);
  });
  return li;
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const creatObjectItem = (objeto) => {
  const item = {
    id: objeto.id,
    img: objeto.thumbnail,
    price: objeto.price,
    title: objeto.title,
  };
  return item;
};

const objetoAdicionar = async () => {
  const arrayItemAdd = document.querySelectorAll('.item__add');  
  arrayItemAdd.forEach(async (btn) => {
    btn.addEventListener('click', async (event) => {
      const idTarget = event.target.parentElement.firstChild.innerText;
      const objeto = await fetchItem(idTarget);
      const newObj = creatObjectItem(objeto);
      const divitem = carrinho.appendChild(liContainer(newObj));
      divitem.appendChild(creatCartItemImg(objeto)); 
      divitem.appendChild(createCartItemElement(newObj));
      getClickedItem(newObj);
      totalPrice();
    });
  });
};

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
  arrayItems.forEach((item) => {
    itemsSection.appendChild(createProductItemElement(item));
  });
  await objetoAdicionar();
  totalPrice();
  document.querySelector('.loading').remove();
};

const searchProduct = () => {
  btnSearch.addEventListener('click', () => {
    const valorBuscado = (searchImput.value).toLowerCase();
    criarLista(valorBuscado);
  });
};

const clearFunction = () => {
  btnClear.addEventListener('click', () => {
    while (carrinho.childNodes.length > 0) {
      carrinho.removeChild(carrinho.firstChild);
    }
    localStorage.setItem('cartItems', '[]');
    totalPrice();
  });
};

window.onload = () => {
  criarLista();
  carregaLista();
  clearFunction();
  searchProduct();
  moveUp();
  totalPrice();
};
