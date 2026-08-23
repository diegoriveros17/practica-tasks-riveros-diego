import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { TeamModel } from "../../models/team.models.js";

export const createTeamValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del equipo no puede ser vacio")
    .custom(async (name) => {
      const teamExist = await TeamModel.findOne({ where: { name } });
      if (teamExist) {
        throw new Error("Ya existe un equipo creado con este nombre");
      }

      return true;
    }),
  ,
  body("description").optional(),
];

export const updateTeamValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del equipo no puede ser vacio")
    .custom(async (name) => {
      const teamExist = await TeamModel.findOne({ where: { name } });
      if (teamExist) {
        throw new Error("Ya existe un equipo creado con este nombre");
      }

      return true;
    }),
  ,
  body("description").optional(),
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const teamExist = await TeamModel.findByPk(id);
      if (!teamExist) {
        throw new Error("No existe un equipo registrado con este id");
      }
      return true;
    }),
];

export const deleteTeamValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const teamExist = await TeamModel.findByPk(id);
      if (!teamExist) {
        throw new Error("No existe un equipo registrado con este id");
      }
      return true;
    }),
];

export const getTeamValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const teamExist = await TeamModel.findByPk(id);
      if (!teamExist) {
        throw new Error("No existe un equipo asociado con este id");
      }
      return true;
    }),
];

export const createTeamUserValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ser vacio")
    .isInt()
    .withMessage("El user_id debe ser un numero entero")
    .custom(async (user_id) => {
      const userExist = await UserModel.findByPk(user_id);
      if (!userExist) {
        throw new Error(
          "No existe el usuario con el que intenta asociar el equipo",
        );
      }

      return true;
    }),
  body("team_id")
    .notEmpty()
    .withMessage("El team_id no puede ser vacio")
    .isInt()
    .withMessage("El team_id debe ser un numero entero")
    .custom(async (team_id) => {
      const teamExist = await TeamModel.findByPk(team_id);
      if (!teamExist) {
        throw new Error(
          "No existe el equipo con el que intenta asociar el usuario",
        );
      }

      return true;
    }),
];
