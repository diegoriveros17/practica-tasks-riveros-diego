import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData, validationResult } from "express-validator";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UserModel,
          as: "usuario",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { id } = validateData;
    const profile = await ProfileModel.findByPk(id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UserModel,
          as: "usuario",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const insertProfile = async (req, res) => {
  try {
    const validateData = matchedData(req);

    await ProfileModel.create(validateData);

    return res.status(201).json({
      message: "Perfil creado correctamente",
      validateData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { id, ...data } = validateData;

    console.log(id, " ", data);

    await ProfileModel.update(data, {
      where: { id },
    });

    return res.status(200).json({
      message: "Perfil actualizado",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { id } = validateData;

    await ProfileModel.destroy({ where: { id } });

    return res.status(200).json({
      message: "Perfil eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
