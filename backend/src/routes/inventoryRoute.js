import express from 'express';
import { createInventory } from '#controllers/inventoryController.js';
const inventoryRouter = express.Router();

inventoryRouter.post('/inventory/new', createInventory);

export default inventoryRouter;
