class CalculadoraDePedido {
  calcular(pedido) {
    let total = 0;
    for (const item of pedido.itens) {
      total += item.preco * item.quantidade;
    }
    if (total > 1000) {
      total *= 0.9;
    }
    return total;
  }
}

class VendasRepository {
  async salvar(pedido) {
    console.log(`Salvando pedido ${pedido.id}...`);
  }
}

class NotificadorService {
  async enviarEmail(pedido) {
    console.log(`Enviando e-mail para ${pedido.clienteEmail}...`);
  }
}

class SistemaDeVendas {
  constructor(calculadora, repository, notificador) {
    this.calculadora = calculadora;
    this.repository = repository;
    this.notificador = notificador;
  }

  async processarVenda(pedido) {
    if (!pedido.itens || pedido.itens.length === 0) {
      throw new Error("Pedido sem itens");
    }

    const total = this.calculadora.calcular(pedido);
    
    await this.repository.salvar(pedido);
    await this.notificador.enviarEmail(pedido);

    return { ...pedido, total, status: "pago" };
  }
}

module.exports = {
  SistemaDeVendas,
  CalculadoraDePedido,
  VendasRepository,
  NotificadorService
};
