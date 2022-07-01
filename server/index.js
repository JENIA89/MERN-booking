import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const port = 8800;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Connected to mongoDB');
  } catch (error) {
    console.log(`${error} did not connect`);
  }
}

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/hotels', hotelsRoute);
app.use('/rooms', roomsRoute);
app.use('/users', usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, ()=> {
  connect();
  console.log('Connected to backend');
})