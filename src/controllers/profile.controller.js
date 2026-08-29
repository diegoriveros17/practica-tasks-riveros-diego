// import { ProfileModel } from "../models/profile.model.js";
// import { UserModel } from "../models/user.model.js";
import { UserModel, ProfileModel } from "../models/index.js";
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
    const { id } = matchedData(req, { locations: ["params"] });

    const profileExist = await ProfileModel.findByPk(id);
    if (!profileExist) {
      return res.status(404).json({
        message: "No existe un perfil asociado con este id",
      });
    }

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
    const data = matchedData(req);
    const { user_id } = data;

    const userExist = await UserModel.findByPk(user_id);
    if (!userExist) {
      return res.status(404).json({
        message: "No existe el usuario con el que intenta crear el perfil",
      });
    }

    const profileExist = await ProfileModel.findOne({ where: { user_id } });
    if (profileExist) {
      return res
        .status(404)
        .json({ message: "Ya existe un perfil registrado con este usuario" });
    }

    const profile = await ProfileModel.create(data);

    return res.status(201).json({
      message: "Perfil creado correctamente",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const { user_id } = data;
    const { id } = matchedData(req, { locations: ["params"] });

    const userExist = await UserModel.findByPk(user_id);
    if (!userExist) {
      return res.status(404).json({
        message: "No existe el usuario con el que intenta crear el perfil",
      });
    }

    const profileExist = await ProfileModel.findByPk(id);
    if (!profileExist) {
      return res
        .status(404)
        .json({ message: "No existe un perfil registrado con este id" });
    }

    const profile = await profileExist.update(data);

    return res.status(200).json({
      message: "Perfil actualizado",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const profileExist = await ProfileModel.findByPk(id);
    if (!profileExist) {
      throw new Error("No existe un perfil registrado con este id");
    }

    const profile = await profileExist.destroy();

    return res.status(200).json({
      message: "Perfil eliminado",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
