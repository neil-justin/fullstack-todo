import mongoose from 'mongoose';
import pkg from 'validator';

const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    required: true,
    type: String,
    validate: [isEmail, 'Email validation failed'],
  },
  passwordHash: {
    required: true,
    type: String,
  },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);

export default User;
