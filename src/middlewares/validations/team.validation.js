import { body, param } from "express-validator";

export const createTeamValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del equipo no puede ser vacio"),
  body("description").optional(),
];

export const updateTeamValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del equipo no puede ser vacio"),
  body("description").optional(),
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];

export const deleteTeamValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];

export const getTeamValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero"),
];

export const createTeamUserValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ser vacio")
    .isInt()
    .withMessage("El user_id debe ser un numero entero"),
  body("team_id")
    .notEmpty()
    .withMessage("El team_id no puede ser vacio")
    .isInt()
    .withMessage("El team_id debe ser un numero entero"),
];
