import User from "../models/User.js";

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.find(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}