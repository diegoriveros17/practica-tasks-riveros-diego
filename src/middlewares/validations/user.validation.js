import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("name").notEmpty().withMessage("El name no puede ser vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no puede ser vacio")
    .isEmail()
    .withMessage("El email ingresado no es correcto")
    .custom(async (email) => {
      const userExist = await UserModel.findOne({ where: { email } });
      if (userExist) {
        throw new Error("Ya existe un usuario registrado con este email");
      }
    }),
  body("password").notEmpty().withMessage("La contreseña no puede ser vacia"),
];

export const updateUserValidation = [
  body("name").notEmpty().withMessage("El name no debe ser vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password").notEmpty().withMessage("La password no debe ser vacia"),
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const userExist = await UserModel.findByPk(id);
      if (!userExist) {
        throw new Error("No existe un usuario registrado con este id");
      }
      return true;
    }),
];

export const deleteUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const userExist = await UserModel.findByPk(id);
      if (!userExist) {
        throw new Error("No existe un usuario registrado con este id");
      }
      return true;
    }),
];

export const getUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id no debe ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async (id) => {
      const userExist = await UserModel.findByPk(id);
      if (!userExist) {
        throw new Error("No existe un usuario registrado con este id");
      }
      return true;
    }),
];
