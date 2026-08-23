import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { ProfileModel } from "../../models/profile.model.js";

export const createProfileValidation = [
  body("description").optional(),
  body("url_image").optional(),
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ser vacio")
    .isInt()
    .withMessage("El user_id debe ser un numero entero")
    .custom(async (user_id) => {
      const userExist = await UserModel.findByPk(user_id);
      if (!userExist) {
        throw new Error(
          "No existe el usuario con el que intenta crear el perfil",
        );
      }

      const profileExist = await ProfileModel.findOne({ where: { user_id } });
      if (profileExist) {
        throw new Error("Ya existe un perfil registrado con este usuario");
      }

      return true;
    }),
];

export const updateProfileValidation = [
  body("description").optional(),
  body("url_image").optional(),
  body("user_id")
    .notEmpty()
    .withMessage("El user_id no puede ser vacio")
    .isInt()
    .withMessage("El user_id debe ser un numero entero")
    .custom(async (user_id) => {
      const userExist = await UserModel.findByPk(user_id);
      if (!userExist) {
        throw new Error(
          "No existe el usuario con el que intenta crear el perfil",
        );
      }

      return true;
    }),
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const profileExist = await ProfileModel.findByPk(id);
      if (!profileExist) {
        throw new Error("No existe un perfil registrado con este id");
      }
      return true;
    }),
];

export const deleteProfileValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const profileExist = await ProfileModel.findByPk(id);
      if (!profileExist) {
        throw new Error("No existe un perfil registrado con este id");
      }
      return true;
    }),
];

export const getProfileValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const profileExist = await ProfileModel.findByPk(id);
      if (!profileExist) {
        throw new Error("No existe un perfil asociado con este id");
      }
      return true;
    }),
];
