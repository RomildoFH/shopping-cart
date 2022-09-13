require('../mocks/fetchSimulator');
// const { expect } = require('chai');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it(('Teste se fetchItem é uma função'), () => {
    const result = typeof fetchItem;
    expect(result).toBe('function');
  });
  it(('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada'), async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  it(('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"'), async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it(('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo'), async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it(('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"'), async () => {
    try {
      const result = await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error ('You must provide an url'));
    }
  });
});
