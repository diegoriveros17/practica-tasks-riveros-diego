import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  insertTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
// import { body } from "express-validator";
import { validate } from "../middlewares/validate.js";
import {
  createTaskValidation,
  deleteTaskValidation,
  getTaskValidation,
  updateTaskValidation,
} from "../middlewares/validations/task.validation.js";

export const taskRouter = Router();

taskRouter.get("/tasks", getAllTasks);

taskRouter.get("/tasks/:id", getTaskValidation, validate, getTaskById);

taskRouter.post("/tasks", createTaskValidation, validate, insertTask);

taskRouter.put("/tasks/:id", updateTaskValidation, validate, updateTask);

taskRouter.delete("/tasks/:id", deleteTaskValidation, validate, deleteTask);
