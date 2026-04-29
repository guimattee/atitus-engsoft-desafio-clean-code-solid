const calcularDesconto = require("../src/calcularDesconto");

describe("Desafio 1: Complexidade Ciclomática", () => {
  test("Premium com valor alto e anos de casa recebe 20%", () => {
    expect(calcularDesconto({ tipo: 'premium', anosCadastro: 10 }, 2000)).toBe(400);
  });
  test("Premium com valor alto e poucos anos de casa recebe 15%", () => {
    expect(calcularDesconto({ tipo: 'premium', anosCadastro: 3 }, 2000)).toBe(300);
  });
  test("Premium com valor médio recebe 10%", () => {
    expect(calcularDesconto({ tipo: 'premium' }, 600)).toBe(60);
  });
  test("Premium com valor baixo recebe 5%", () => {
    expect(calcularDesconto({ tipo: 'premium' }, 100)).toBe(5);
  });
  test("Gold com valor alto recebe 10%", () => {
    expect(calcularDesconto({ tipo: 'gold' }, 2000)).toBe(200);
  });
  test("Gold com valor baixo recebe 2%", () => {
    expect(calcularDesconto({ tipo: 'gold' }, 100)).toBe(2);
  });
  test("Cliente comum não recebe desconto", () => {
    expect(calcularDesconto({ tipo: 'comum' }, 100)).toBe(0);
  });
});
