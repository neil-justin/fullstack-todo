import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: { required: true, type: mongoose.Schema.Types.ObjectId },
  task: {
    required: true,
    type: String,
  },
  description: String,
  dueDate: Date,
});

taskSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
