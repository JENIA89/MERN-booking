import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

//create
router.post('/', async (req, res)=> {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error)
  }
})

//update
router.put('/:id', async (req, res)=> {
  const { id } = req.params;

  try {
    const updateHotel = await Hotel.findByIdAndUpdate(id, {$set: req.body}, {new: true})
    res.status(200).json(updateHotel);
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete
router.delete('/:id', async (req, res)=> {
  const { id } = req.params;

  try {
    await Hotel.findByIdAndDelete(id)
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json(error)
  }
})

//get
router.get('/:id', async (req, res)=> {
  const { id } = req.params;

  try {
    const hotel = await Hotel.find(id)
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error)
  }
})

//getAll
router.get('/', async (req, res)=> {

  try {
    const hotels = await Hotel.find()
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error)
  }
})

export default router;