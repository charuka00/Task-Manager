import express from "express";
import { createTask, updateTask, getTaskById, getAllTasks, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.get("/tasks/:id", getTaskById);
router.get("/tasks", getAllTasks);
router.delete("/tasks/:id", deleteTask);

export default router;