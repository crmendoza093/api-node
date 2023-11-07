const express = require('express');
const ProductsService = require('./../services/products.service')

const router = express.Router();
const productService = new ProductsService();

router.get('/', async (req, res, next) => {
  try {
    const { select, limit } = req.query;
    const products = await productService.index(select, limit);
    res.json(products);
  } catch(error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const { name } = req.query;
    const products = await productService.by_name(name);
    res.json(products);
  } catch(error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.show(id);
    res.json(product);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
