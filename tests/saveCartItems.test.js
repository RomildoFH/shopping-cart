const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test(('se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado'), async () => {
    await saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
  test(('se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems'), async () => {
    await saveCartItems('cartItem');    
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
  })
});
