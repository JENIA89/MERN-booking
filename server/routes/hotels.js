import express from 'express';
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//create
router.post('/', verifyAdmin, createHotel);
//getById
router.get('/:id', getHotel);
//gettAll
router.get('/', getHotels);
//put
router.put('/:id', verifyAdmin, updateHotel);
//delete
router.delete('/:id', verifyAdmin, deleteHotel);

export default router;