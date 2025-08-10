import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true, default: 'Pending' },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);