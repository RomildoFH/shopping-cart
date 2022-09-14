const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
// const { expect } = require('chai');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test(('se, ao executar getSavedCartItems, o método localStorage.getItem é chamado'), async () => {
    await getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  test(('se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro'), async () => {
    await getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
