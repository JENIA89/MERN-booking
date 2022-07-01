import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })

    await newUser.save();
    res.status(200).json({message: 'User has been created'})
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res) => {
  try {
    const oldUser = await User.findOne({username: req.body.username});
    if(!oldUser) return res.status(404).json({ message: 'User doesn"t exists' });

    const isPasswordCorrect = await bcrypt.compare(req.body.password, oldUser.password);
    if(!isPasswordCorrect) return res.status(404).json({ message: 'Invalid password' });

    const token = jwt.sign({id: oldUser._id, isAdmin: oldUser.isAdmin}, process.env.JWT)

    res.cookie('access_token', token, {httpOnly: true}).status(200).json(oldUser)
  } catch (error) {
    next(error);
  }
}