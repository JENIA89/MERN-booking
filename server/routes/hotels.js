import express from 'express';
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel
} from '../controllers/hotel.js';

const router = express.Router();

//create
router.post('/', createHotel);
//getById
router.get('/:id', getHotel);
//gettAll
router.get('/', getHotels);
//put
router.put('/', updateHotel);
//delete
router.delete('/:id', deleteHotel);

export default router;