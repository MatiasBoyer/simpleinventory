import express from 'express';
import itemsController from '#controllers/itemsController.js';
import authenticationHandler from '#middlewares/authenticationHandler.js';
const router = express.Router();

router.use(authenticationHandler);
router.get('/items', itemsController.getItems); // item list
router.post('/items', itemsController.addItem); // create item
router.delete('/items/:itemId', itemsController.deleteItem); // delete item
router.patch('/items/:itemId', itemsController.modifyItem); // modify item quantity

export default router;
