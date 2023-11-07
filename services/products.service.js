const boom = require('@hapi/boom');
const baseUrl = 'https://dummyjson.com/products/';

class ProductsService {
  async index(select, limit){
    try {
      const queryParams = new URLSearchParams();
      if (select) queryParams.set('select', select);
      if (limit) queryParams.set('limit', limit);
      const URL = `${baseUrl}?${queryParams.toString()}`;

      const response = await fetch(URL);

      if (response.ok) {
        return await response.json();
      } else {
        throw boom.notFound('product not found');
      }
    } catch (error) {
      throw boom.serverUnavailable(error);
    }
  }

  async by_name(name){
    try {
      const queryParams = new URLSearchParams();
      if (name) queryParams.set('q', name);
      const URL = `${baseUrl}search?${queryParams}`;
      const response = await fetch(URL);

      if (response.ok) {
        return await response.json();
      } else {
        throw boom.notFound('product not found');
      }
    } catch (error) {
      throw boom.serverUnavailable(error);
    }
  }

  async show(id){
    try {
      const response = await fetch(baseUrl + id);

      if (response.ok) {
        return await response.json();
      } else {
        throw boom.notFound('product not found');
      }
    } catch (error) {
      throw boom.serverUnavailable(error);
    }
  }
}

module.exports = ProductsService;
