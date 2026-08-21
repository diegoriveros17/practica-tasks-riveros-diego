import { body } from "express-validator";
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
  body("name").optional().notEmpty().withMessage("El name no debe ser vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password").notEmpty().withMessage("La password no debe ser vacia"),
  body("person_id").notEmpty().withMessage("El person_id no debe ser vacio"),
];
