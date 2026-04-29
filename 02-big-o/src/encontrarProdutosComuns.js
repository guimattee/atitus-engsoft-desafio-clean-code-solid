/**
 * ❌ OTIMIZAÇÃO O(n²) para O(n)
 */

function filtrarComuns(listaA, listaB) {
  const intersecção = listaA.filter(item => listaB.includes(item));
  return intersecção.sort((a, b) => a - b);
}

module.exports = filtrarComuns;