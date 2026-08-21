import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { body } from "express-validator";
import { validate } from "../middlewares/validate.js";
import { createUserValidation } from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", getUserById);

userRouter.post("/users", createUserValidation, validate, insertUser);

userRouter.put("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);
