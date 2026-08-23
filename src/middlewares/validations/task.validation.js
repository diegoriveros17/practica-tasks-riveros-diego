import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("El title no puede ser vacio")
    .isLength({ max: 100 })
    .withMessage("El title no puede superar los 100 caracteres")
    .custom(async (title) => {
      const taskExist = await TaskModel.findOne({ where: { title } });
      if (taskExist) {
        throw new Error("Ya existe una tarea registrada con este title");
      }
    }),
  body("description")
    .notEmpty()
    .withMessage("La description no puede ser vacia")
    .isLength({ max: 100 })
    .withMessage("La description no puede superar los 100 caracteres"),
  body("is_complete")
    .isBoolean()
    .withMessage("El campo is_complete debe ser un valor booleano"),
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ser vacio")
    .isInt()
    .withMessage("El user_id debe ser un numero entero")
    .custom(async (user_id) => {
      const userExist = await UserModel.findByPk(user_id);
      if (!userExist) {
        throw new Error("La tarea debe estar asociada a un usuario existente");
      }
      return true;
    }),
];

export const updateTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("El title no puede ser vacio")
    .isLength({ max: 100 })
    .withMessage("El title no puede superar los 100 caracteres")
    .custom(async (title) => {
      const taskExist = await TaskModel.findOne({ where: { title } });
      if (taskExist) {
        throw new Error("Ya existe una tarea registrada con este title");
      }
    }),
  body("description")
    .notEmpty()
    .withMessage("La description no puede ser vacia")
    .isLength({ max: 100 })
    .withMessage("La description no puede superar los 100 caracteres"),
  body("is_complete")
    .isBoolean()
    .withMessage("El campo is_complete debe ser un valor booleano"),
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ser vacio")
    .isInt()
    .withMessage("El user_id debe ser un numero entero")
    .custom(async (user_id) => {
      const userExist = await UserModel.findByPk(user_id);
      if (!userExist) {
        throw new Error("La tarea debe estar asociada a un usuario existente");
      }
      return true;
    }),
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const taskExist = await TaskModel.findByPk(id);
      if (!taskExist) {
        throw new Error("No existe una tarea registrada con este id");
      }
      return true;
    }),
];

export const deleteTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const taskExist = await TaskModel.findByPk(id);
      if (!taskExist) {
        throw new Error("No existe una tarea registrada con este id");
      }
      return true;
    }),
];

export const getTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const taskExist = await TaskModel.findByPk(id);
      if (!taskExist) {
        throw new Error("No existe una tarea registrada con este id");
      }
      return true;
    }),
];
