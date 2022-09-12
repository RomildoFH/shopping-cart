require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fetchProducts é uma função'), () => {
    const resultado = typeof fetchProducts;
    expect(resultado).toBe('function');
  }
  it("Execute a função fetchProducts com o argumento 'computador' e teste se fetch foi chamada"), async () => {
    await fetchProducts('computador')
    expect(fetch).toBeCalled();
  }
  it("Execute a função fetchProducts com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch"), async () => {
    const resultado = await fetchProducts('computador')
    expect(resultado).toMatchObject(computadorSearch);
  }
  it("Se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: 'You must provide an url'"), async () => {
    const resultado = await fetchProducts();
    expect(resultado).toThrow(new Error ('You must provide an url'));
  }
  fail('Teste vazio');
});
