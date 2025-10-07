import express from 'express';
import * as HouseHoldItemsController from '../controller/HouseHoldItemsController.js';

const router = express.Router();

router.get('/all', HouseHoldItemsController.getAllHouseHoldItems);
router.get('/:id', HouseHoldItemsController.getAllHouseHoldItemsById);
router.get('/category/:category', HouseHoldItemsController.getAllHouseHoldItemsByCategory);
router.post('/', HouseHoldItemsController.createHouseHoldItem);
router.put('/:id', HouseHoldItemsController.updateHouseHoldItem);
router.delete('/:id', HouseHoldItemsController.deleteHouseHoldItem);

export default router;