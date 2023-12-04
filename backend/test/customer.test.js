import Customer from "../src/models/Customer";
import Order from "../src/models/Order";
import customerService from "../src/services/customer.service";
jest.mock('../src/models/Order'); // ajuste o caminho conforme a sua estrutura



jest.mock("../src/models/Customer", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  delete: jest.fn(),
}));

describe("createService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Criar novo cliente no banco de dados", async () => {
    const mockCustomer = {
      name: "Clara Oliveira",
      email: "ClaraOliveira@gmail.com",
    };

    const mockCreatedCustomer = {
      _id: "1234567890",
      name: "Clara Oliveira",
      email: "ClaraOliveira@gmail.com",
    };

    Customer.create.mockResolvedValue(mockCreatedCustomer);

    const result = await customerService.createService(mockCustomer);

    expect(Customer.create).toHaveBeenCalledWith(mockCustomer);
    expect(result).toEqual(mockCreatedCustomer);
  });

  it("Lançamento de erro caso a criação do cliente falhe", async () => {
    const mockCustomer = {
      name: "Clara Oliveira",
      email: "ClaraOliveira@gmail.com",
    };

    const mockError = new Error("Falha ao criar cliente");

    Customer.create.mockRejectedValue(mockError);

    await expect(
      customerService.createService(mockCustomer)
    ).rejects.toThrowError(mockError);
  });
});

describe("findAllService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar todos os clientes do banco de dados", async () => {
    const mockCustomers = [
      { _id: "1", name: "Clara Oliveira", email: "ClaraOliveira@gmail.com" },
      {
        _id: "2",
        name: "Rafael Rodrigues",
        email: "RafaelRodrigues@gmail.com",
      },
    ];

    Customer.find.mockResolvedValue(mockCustomers);

    const result = await customerService.findAllService();

    expect(Customer.find).toHaveBeenCalled();
    expect(result).toEqual(mockCustomers);
  });

  it("Caso nenhum cliente seja encontrado, retornar um array vazio ", async () => {
    const mockCustomers = [];

    Customer.find.mockResolvedValue(mockCustomers);

    const result = await customerService.findAllService();

    expect(Customer.find).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it("Erro caso a recuperação do cliente falhe", async () => {
    const mockError = new Error("Falha ao recuperar clientes");

    Customer.find.mockRejectedValue(mockError);

    await expect(customerService.findAllService()).rejects.toThrowError(
      mockError
    );
  });
});

describe("findByIdService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve encontrar o cliente pelo seu id", async () => {
    const mockId = "1234567890";

    const mockCustomer = {
      _id: mockId,
      name: "Clara Oliveira",
      email: "ClaraOliveira@gmail.com",
    };

    Customer.findById.mockResolvedValue(mockCustomer);

    const result = await customerService.findByIdService(mockId);

    expect(Customer.findById).toHaveBeenCalledWith(mockId);
    expect(result).toEqual(mockCustomer);
  });

  it("Caso o cliente não seja encontrado, retornar null", async () => {
    const mockId = "1234567890";

    Customer.findById.mockResolvedValue(null);

    const result = await customerService.findByIdService(mockId);

    expect(Customer.findById).toHaveBeenCalledWith(mockId);
    expect(result).toBeNull();
  });

  it("Lançamento de erro caso a recuperação do cliente falhe", async () => {
    const mockId = "1234567890";
    const mockError = new Error("Falha ao recuperar cliente");

    Customer.findById.mockRejectedValue(mockError);

    await expect(customerService.findByIdService(mockId)).rejects.toThrowError(
      mockError
    );
  });
});

describe("updateService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve atualizar o cliente no banco de dados", async () => {
    const mockId = "1234567890";

    const mockCustomer = {
      _id: mockId,
      nome: "Clara",
      telefone: 123456,
      email: "Clara@gmail.com",
      divida: 1000,
    };

    const updatedFields = {
      nome: "Clara Oliveira",
      telefone: 654321,
      email: "ClaraOliveira@gmail.com",
      divida: 500,
    };

    const mockUpdatedCustomer = {
      _id: mockId,
      nome: "Clara Oliveira",
      telefone: 654321,
      email: "ClaraOliveira@gmail.com",
      divida: 500,
    };

    Customer.findOneAndUpdate.mockResolvedValue(mockUpdatedCustomer);

    const result = await customerService.updateService(
      mockId,
      updatedFields.nome,
      updatedFields.telefone,
      updatedFields.email,
      updatedFields.divida
    );

    expect(Customer.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockId },
      updatedFields
    );
    expect(result).toEqual(mockUpdatedCustomer);
  });

  it("Erro caso a atualização do cliente falhe", async () => {
    const mockId = "1234567890";

    const updatedFields = {
      nome: "Clara Oliveira",
      telefone: 654321,
      email: "ClaraOliveira@gmail.com",
      divida: 500,
    };

    const mockError = new Error("Falha ao atualizar cliente");

    Customer.findOneAndUpdate.mockRejectedValue(mockError);

    await expect(
      customerService.updateService(
        mockId,
        updatedFields.nome,
        updatedFields.telefone,
        updatedFields.email,
        updatedFields.divida
      )
    ).rejects.toThrowError(mockError);
  });
});

describe("deleteService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve deletar o cliente no banco de dados", async () => {
    const mockId = "1234567890";

    const mockDeletedCustomer = {
      _id: mockId,
      nome: "Clara",
      telefone: 123456,
      email: "clara@gmail.com",
      divida: 1000,
    };

    Customer.findOneAndDelete = jest
      .fn()
      .mockResolvedValue(mockDeletedCustomer);

    const result = await customerService.deleteService(mockId);

    expect(Customer.findOneAndDelete).toHaveBeenCalledWith({ _id: mockId });
    expect(result).toEqual(mockDeletedCustomer);
  });

  it("Erro caso a remoção do cliente falhe", async () => {
    const mockId = "1234567890";

    const mockError = new Error("Falha ao deletar cliente");

    Customer.findOneAndDelete = jest.fn().mockRejectedValue(mockError);

    await expect(customerService.deleteService(mockId)).rejects.toThrowError(
      mockError
    );
  });
});

describe("viewCustomerStatementByPeriod", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  it("Deve retornar uma lista vazia se o cliente não tiver pedidos no intervalo de datas", async () => {
    const findSpy = jest.spyOn(Order, 'find').mockResolvedValue([]);
    const result = await customerService.viewCustomerStatementByPeriod('cliente1', '2023-01-01', '2023-02-01');
  
    expect(findSpy).toHaveBeenCalledWith({
      cliente: 'cliente1',
      dataPedido: { $gte: '2023-01-01', $lt: '2023-02-01' }
    });
  
    expect(result).toEqual([]);
  
    findSpy.mockRestore();
  });
  

  it("Deve retornar pedidos do cliente no intervalo de datas", async () => {
    const mockOrders = [
      { _id: '1', cliente: 'cliente1', dataPedido: '2023-01-15' },
      { _id: '2', cliente: 'cliente1', dataPedido: '2023-01-25' },
      { _id: '3', cliente: 'cliente1', dataPedido: '2023-02-05' },
    ];
  
    const findSpy = jest.spyOn(Order, 'find').mockResolvedValue(mockOrders);
  
    const startDate = '2023-01-01';
    const endDate = '2023-02-01';
    const identifier = 'cliente1';
  
    const result = await customerService.viewCustomerStatementByPeriod(identifier, startDate, endDate);
  
    expect(findSpy).toHaveBeenCalledWith({
      cliente: identifier,
      dataPedido: { $gte: startDate, $lt: endDate }
    });
  
    expect(result).toEqual(mockOrders);
  
    findSpy.mockRestore();
  });

  it("Deve lançar um erro se as datas são inválidas", async () => {
    const currentDate = new Date()
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7)
    const futureDateString = futureDate.toISOString().split('T')[0]
    const currentDateString = currentDate.toISOString().split('T')[0]
  
    await expect(customerService.viewCustomerStatementByPeriod('cliente1', '2023-02-01', '2023-01-01'))
      .rejects.toThrowError('Datas inválidas');
  
    await expect(customerService.viewCustomerStatementByPeriod('cliente1', '2023-02-01', futureDateString))
      .rejects.toThrowError('Datas inválidas');

    await expect(customerService.viewCustomerStatementByPeriod('cliente1', currentDateString, '2023-02-01'))
      .rejects.toThrowError('Datas inválidas');
  });
  
});
