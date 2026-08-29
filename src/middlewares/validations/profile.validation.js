import { body, param } from "express-validator";

export const createProfileValidation = [
  body("description").optional(),
  body("url_image").optional(),
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ser vacio")
    .isInt()
    .withMessage("El user_id debe ser un numero entero"),
];

export const updateProfileValidation = [
  body("description").optional(),
  body("url_image").optional(),
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ser vacio")
    .isInt()
    .withMessage("El user_id debe ser un numero entero"),
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];

export const deleteProfileValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];

export const getProfileValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];
