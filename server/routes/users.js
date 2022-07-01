import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//getById
router.get('/:id', verifyUser, getUser);
//gettAll
router.get('/', verifyAdmin, getUsers);
//put
router.put('/', verifyUser, updateUser);
//delete
router.delete('/:id', verifyUser, deleteUser);

export default router;