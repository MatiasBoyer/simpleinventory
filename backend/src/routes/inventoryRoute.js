import express from 'express';
import inventoryController from '#controllers/inventoryController.js';
import itemsController from '#controllers/itemsController.js';
import authenticationHandler from '#middlewares/authenticationHandler.js';
const router = express.Router();

router.use(authenticationHandler);
router.post('/new', inventoryController.createInventory); // create
router.delete('/:inventoryId', inventoryController.deleteInventory); // delete
router.get('/list', inventoryController.getInventories); // getList
router.patch('/:inventoryId', inventoryController.updateInventory); // getList

export default router;
