import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
}

export const getHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.find(id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
}

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const citieslist = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({city: city})
    }))
    res.status(200).json(citieslist);
  } catch (error) {
    next(error);
  }
}

export const updateHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updateHotel = await Hotel.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
}

export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    next(error);
  }
}