import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    next(error);
  }
}