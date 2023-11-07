const express = require('express');
const ProductsService = require('./../services/products.service')

const router = express.Router();
const productService = new ProductsService();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Obtiene una lista de productos.
 *     description: Endpoint para obtener una lista de productos con opciones de selección y cantidad de registros por pagina.
 *     parameters:
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: Campos a seleccionar (separados por comas).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de productos a devolver.
 *     responses:
 *       '200':
 *         description: Lista de productos obtenida con éxito.
 *       '404':
 *         description: Producto no encontrado.
 *       '500':
 *         description: Error en el servidor.
 */
router.get('/', async (req, res, next) => {
  try {
    const { select, limit } = req.query;
    const products = await productService.index(select, limit);
    res.json(products);
  } catch(error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/products/search:
 *   get:
 *     summary: Busca productos por nombre.
 *     description: Endpoint para buscar productos por su nombre.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del producto a buscar.
 *     responses:
 *       '200':
 *         description: Productos encontrados con éxito.
 *       '404':
 *         description: No se encontraron productos con el nombre especificado.
 *       '500':
 *         description: Error en el servidor.
 */
router.get('/search', async (req, res, next) => {
  try {
    const { name } = req.query;
    const products = await productService.by_name(name);
    res.json(products);
  } catch(error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID.
 *     description: Endpoint para obtener un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a buscar.
 *     responses:
 *       '200':
 *         description: Producto encontrado con éxito.
 *       '404':
 *         description: Producto no encontrado.
 *       '500':
 *         description: Error en el servidor.
 */
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
