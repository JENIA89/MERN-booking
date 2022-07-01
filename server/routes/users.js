import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../controllers/user.js';

const router = express.Router();

//getById
router.get('/:id', getUser);
//gettAll
router.get('/', getUsers);
//put
router.put('/', updateUser);
//delete
router.delete('/:id', deleteUser);

export default router;