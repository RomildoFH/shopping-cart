require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test(('Verifica se fetchProducts é uma função'), () => {
    const resultado = typeof fetchProducts;
    expect(resultado).toBe('function');
  })
  test(("Execute a função fetchProducts com o argumento 'computador' e teste se fetch foi chamada"), async () => {
    await fetchProducts('computador')
    expect(fetch).toBeCalled();
  })
  test(("Execute a função fetchProducts com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch"), async () => {
    const resultado = await fetchProducts('computador')
    // console.log(computadorSearch);
    expect(resultado).toEqual(computadorSearch);
  })
  test(("Se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: 'You must provide an url'"), async () => {
    try {
    const resultado = await fetchProducts();
    return resultado;
  } catch (error) {
    expect(error).toEqual(new Error ('You must provide an url'));
  }
  })
  // fail('Teste vazio');
});
