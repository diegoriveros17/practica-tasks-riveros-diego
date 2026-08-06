import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  insertTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.get("/tasks", getAllTasks);

taskRouter.get("/tasks/:id", getTaskById);

taskRouter.post("/tasks", insertTask);

taskRouter.put("/tasks", updateTask);

taskRouter.delete("/tasks", deleteTask);
