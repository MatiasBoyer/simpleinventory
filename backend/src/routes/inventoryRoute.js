import express from 'express';
import { createInventory } from '#controllers/inventoryController.js';
const inventoryRouter = express.Router();

inventoryRouter.post('/new', createInventory); // create
inventoryRouter.delete('/:inventoryId', undefined); // delete
inventoryRouter.get('/list', undefined); // getList

inventoryRouter.get('/:inventoryId/items', undefined); // item list
inventoryRouter.post('/:inventoryId/items', undefined); // create item
inventoryRouter.delete('/:inventoryId/items/:itemId', undefined); // delete item
inventoryRouter.patch('/:inventoryId/items/:itemId', undefined); // modify item quantity

export default inventoryRouter;
