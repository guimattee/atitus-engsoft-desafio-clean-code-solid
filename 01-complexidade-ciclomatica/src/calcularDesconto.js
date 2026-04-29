function calcularDesconto(cliente, valor) {
  const regras = {
    premium: [
      { check: (v, a) => v > 1000 && a > 5, taxa: 0.20 },
      { check: (v) => v > 1000, taxa: 0.15 },
      { check: (v) => v > 500, taxa: 0.10 },
      { check: () => true, taxa: 0.05 },
    ],
    gold: [
      { check: (v) => v > 1000, taxa: 0.10 },
      { check: () => true, taxa: 0.02 },
    ],
  };

  const regrasTipo = regras[cliente.tipo];
  if (!regrasTipo) return 0;

  const regra = regrasTipo.find((r) => r.check(valor, cliente.anosCadastro));
  return regra ? valor * regra.taxa : 0;
}

module.exports = calcularDesconto;
