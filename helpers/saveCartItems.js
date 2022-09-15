const saveCartItems = (objeto) => {
  localStorage.setItem('cartItems', objeto);
  return localStorage;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
