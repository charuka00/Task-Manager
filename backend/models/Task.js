import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true, default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true, default: 'Low' } // New Priority field
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);