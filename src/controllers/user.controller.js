import { UserModel } from "../models/user.model.js";
import { TeamModel } from "../models/team.models.js";
import { matchedData, validationResult } from "express-validator";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password", "id"] },
      include: [
        {
          model: TeamModel,
          as: "equipos",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const idUser = req.params.id;
    const user = await UserModel.findByPk(idUser, {
      attributes: { exclude: ["password", "id"] },
      include: [
        {
          model: TeamModel,
          as: "equipos",
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "No existe un usuario con el id especificado",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const insertUser = async (req, res) => {
  try {
    const validateData = matchedData(req);

    const user = await UserModel.create(validateData);

    return res.status(201).json({
      message: "Usuario agregado correctamente",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const user = await UserModel.findByPk(idUser);
    const { name, email, password } = req.body;

    if (!user) {
      return res.status(404).json({
        message: "No existe usuario con el id especificado para modificar",
      });
    }

    await user.update({
      name,
      email,
      password,
    });

    return res.status(200).json({
      message: "Usuario modificado",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const user = await UserModel.findByPk(idUser);

    if (!user) {
      return res.status(404).json({
        message: "No existe usuario con el id especificado para eliminar",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Usuario Eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
