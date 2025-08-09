import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  if (!title || !description || !dueDate || !status || !priority) {
    console.error('Validation error:', { title, description, dueDate, status, priority });
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const taskData = {
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      priority, // Include priority in task data
    };
    console.log('Creating task with data:', taskData);
    const task = await Task.create(taskData);
    console.log('Task created successfully:', task);
    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  if (!title || !description || !dueDate || !status || !priority) {
    console.error('Validation error:', { title, description, dueDate, status, priority });
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const taskData = {
      title,
      description,
      dueDate: new Date(dueDate),
      status,
      priority, // Include priority in task data
    };
    console.log('Updating task with data:', taskData, 'for ID:', req.params.id);
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      taskData,
      { new: true, runValidators: true }
    );
    if (!task) {
      console.log('Task not found for ID:', req.params.id);
      return res.status(404).json({ message: "Task not found" });
    }
    console.log('Task updated successfully:', task);
    res.status(200).json(task);
  } catch (err) {
    console.error('Update task error:', err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      console.log('Task not found for ID:', req.params.id);
      return res.status(404).json({ message: "Task not found" });
    }
    console.log('Task fetched successfully:', task);
    res.status(200).json(task);
  } catch (err) {
    console.error('Get task error:', err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log('All tasks fetched:', tasks);
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Get all tasks error:', err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      console.log('Task not found for ID:', req.params.id);
      return res.status(404).json({ message: "Task not found" });
    }
    console.log('Task deleted successfully:', task);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error('Delete task error:', err.message, err.stack);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};