import express from 'express';
import itemsController from '#controllers/itemsController.js';
const router = express.Router();

router.get('/items', itemsController.getItems); // item list
router.post('/items', itemsController.addItem); // create item
router.delete('/items/:itemId', itemsController.deleteItem); // delete item
router.patch('/items/:itemId', itemsController.modifyItem); // modify item quantity

export default router;
