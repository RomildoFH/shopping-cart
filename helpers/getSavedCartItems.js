const getSavedCartItems = () => {
  // essa função deverá retornar as li's do localStorage e atualizar a ol.
  const retorno = localStorage.getItem('cartItems');
  return (retorno);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
