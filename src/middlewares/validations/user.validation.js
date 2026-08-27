import { body, param } from "express-validator";

export const createUserValidation = [
  body("name").notEmpty().withMessage("El name no puede ser vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no puede ser vacio")
    .isEmail()
    .withMessage("El email ingresado no es correcto"),
  body("password").notEmpty().withMessage("La contreseña no puede ser vacia"),
];

export const updateUserValidation = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El name no debe ser vacio"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("La password no debe ser vacia"),
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
];

export const deleteUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
];

export const getUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
];
