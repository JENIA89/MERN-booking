import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    console.log(req.body, 'req.body');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res) => {
  try {
    const oldUser = await User.findOne({username: req.body.username});
    if(!oldUser) return res.status(404).json({ message: 'User doesn"t exists' });

    const isPasswordCorrect = await bcrypt.compare(req.body.password, oldUser.password);
    if(!isPasswordCorrect) return res.status(404).json({ message: 'Invalid password' });

    const token = jwt.sign({id: oldUser._id, isAdmin: oldUser.isAdmin}, process.env.JWT);
    const { password, isAdmin, ...otherDetails } = oldUser._doc;

    res.cookie('access_token', token, {httpOnly: true}).status(200).json({details: {...otherDetails}, isAdmin})
  } catch (error) {
    next(error);
  }
}