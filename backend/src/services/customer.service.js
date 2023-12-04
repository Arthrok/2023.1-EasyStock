import Customer from "../models/Customer.js";
import Order from "../models/Order.js";
import orderService from "./order.service.js";

// Funções que acessam o banco de dados para criação, leitura, atualização e exclusão
const createService = (body) => Customer.create(body);

const findAllService = () => Customer.find();

const findByIdService = (id) => Customer.findById(id);

const updateService = (id, nome, telefone, email, divida) =>
  Customer.findOneAndUpdate({ _id: id }, { nome, telefone, email, divida });

const deleteService = (id) => Customer.findOneAndDelete({ _id: id });


const formatDateTime = (dateTimeString) => {
  const [datePart, timePart] = dateTimeString.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hour, minute, second] = timePart.split(':');

  // Formata a data para o formato mm-dd-yyyy
  const formattedDate = `${month.padStart(2, '0')}-${day.padStart(2, '0')}-${year}`;

  // Formata a hora para o formato hh:mm:ss
  const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;

  // Combina a data e a hora formatadas
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
};

const viewCustomerStatementByPeriod = async (identifier, startDate, endDate) => {
  try {
    const currentDate = new Date()

    if (startDate > currentDate || endDate > currentDate || endDate < startDate) {
      throw new Error('Datas inválidas');
    }

    const orders = await Order.find({
      cliente: identifier
    });

    const filteredOrders = orders.filter(order => {
      const orderDate   = new Date(formatDateTime(order.dataPedido));
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    return filteredOrders;
  } catch (error) {
    return Promise.reject(error);
  }
};


  
  
  

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
  viewCustomerStatementByPeriod
};
