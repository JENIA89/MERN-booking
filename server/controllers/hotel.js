import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const getHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.find(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const updateHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const updateHotel = await Hotel.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.status(200).json(updateHotel);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}