import mongoose from 'mongoose';
import { MONGODB_URL } from './config';

const connectToDB = async () => {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(MONGODB_URL);
    console.log('connected to MongoDB');
  } catch (error) {
    console.error('error connecting to MongoDB', error);
  }
};

export default connectToDB;
