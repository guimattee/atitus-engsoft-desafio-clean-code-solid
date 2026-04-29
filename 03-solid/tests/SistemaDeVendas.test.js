const { 
  SistemaDeVendas, 
  CalculadoraDePedido, 
  VendasRepository, 
  NotificadorService 
} = require("../src/SistemaDeVendas");

describe("Desafio 3: SOLID", () => {
  test("Processa venda com total e desconto", async () => {
    // Injeção de Dependências
    const calculadora = new CalculadoraDePedido();
    const repository = new VendasRepository();
    const notificador = new NotificadorService();
    
    const sistema = new SistemaDeVendas(calculadora, repository, notificador);
    
    const pedido = { id: 1, clienteEmail: "a@a.com", itens: [{ preco: 1200, quantidade: 1 }] };
    const res = await sistema.processarVenda(pedido);
    
    expect(res.total).toBe(1080);
    expect(res.status).toBe("pago");
  });

  test("Deve lançar erro para pedido sem itens", async () => {
    const calculadora = new CalculadoraDePedido();
    const repository = new VendasRepository();
    const notificador = new NotificadorService();
    const sistema = new SistemaDeVendas(calculadora, repository, notificador);

    const pedido = { id: 2, clienteEmail: "b@b.com", itens: [] };
    
    await expect(sistema.processarVenda(pedido)).rejects.toThrow("Pedido sem itens");
  });

  test("Deve chamar o repositório e o notificador com o pedido correto", async () => {
    const calculadoraMock = { calcular: jest.fn().mockReturnValue(100) };
    const repositoryMock = { salvar: jest.fn().mockResolvedValue() };
    const notificadorMock = { enviarEmail: jest.fn().mockResolvedValue() };
    
    const sistema = new SistemaDeVendas(calculadoraMock, repositoryMock, notificadorMock);
    
    const pedido = { id: 3, clienteEmail: "mock@mock.com", itens: [{ preco: 100, quantidade: 1 }] };
    await sistema.processarVenda(pedido);
    
    expect(calculadoraMock.calcular).toHaveBeenCalledWith(pedido);
    expect(repositoryMock.salvar).toHaveBeenCalledWith(pedido);
    expect(notificadorMock.enviarEmail).toHaveBeenCalledWith(pedido);
  });
});
