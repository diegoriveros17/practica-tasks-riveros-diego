import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

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
    const idProfile = req.params.id;
    const profile = await ProfileModel.findByPk(idProfile, {
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

    if (!profile) {
      return res.status(404).json({
        message: "No existe un asociado al id especificado",
      });
    }
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const insertProfile = async (req, res) => {
  try {
    const { description, url_img, user_id } = req.body;

    const profileExist = await ProfileModel.findOne({ where: { user_id } });
    const userExist = await UserModel.findOne({ where: { id: user_id } });

    if (!userExist) {
      return res.status(400).json({
        message: "No existe el usuario con el que intenta crear el perfil",
      });
    }

    if (profileExist) {
      return res.status(400).json({
        message: "Ya existe una perfil creado para este usuario",
      });
    }

    if (!user_id || typeof userExist === "undefined") {
      return res.status(400).json({
        message: "El perfil solo puede crearse asociado a un usuario existente",
      });
    }

    const profile = await ProfileModel.create({
      description,
      url_img,
      user_id,
    });

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
    const idProfile = req.params.id;
    const profile = await ProfileModel.findByPk(idProfile);
    const { description, url_img, user_id } = req.body;

    if (!profile) {
      return res.status(404).json({
        message: "No existe un perfil asociado al usuario para modificar",
      });
    }

    await profile.update({ description, url_img });

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
    const idProfile = req.params.id;
    const profile = await ProfileModel.findByPk(idProfile);

    if (!profile) {
      return res.status(404).json({
        message:
          "No existe un perfil asociado al usuario especificado para eliminar",
      });
    }

    await profile.destroy();

    return res.status(200).json({
      message: "Perfil eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
