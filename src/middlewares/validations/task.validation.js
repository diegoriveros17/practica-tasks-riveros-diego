import { body, param } from "express-validator";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("El title no puede ser vacio")
    .isLength({ max: 100 })
    .withMessage("El title no puede superar los 100 caracteres"),
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
];

export const updateTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("El title no puede ser vacio")
    .isLength({ max: 100 })
    .withMessage("El title no puede superar los 100 caracteres"),
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
    .withMessage("El user_id debe ser un numero entero"),
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
];

export const deleteTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
];

export const getTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
];
