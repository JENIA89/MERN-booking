import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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

app.listen(port, ()=> {
  connect();
  console.log('Connected to backend');
})