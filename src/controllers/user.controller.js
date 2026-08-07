import { UserModel } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();

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
    const user = await UserModel.findByPk(idUser);

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
    const { name, email, password } = req.body;
    const users = await UserModel.findAll();

    const userExist = users.find((user) => {
      return user.email.toUpperCase() === email.toUpperCase();
    });

    if (userExist) {
      return res.status(400).json({
        message: "Ya existe una usuario registrado con el email ",
      });
    }

    if (!name || name.trim() === "" || name.trim().length > 100) {
      return res.status(400).json({
        message:
          "El nombre es obligatorio, no puede estar vacío ni superar los 100 caracteres.",
      });
    }

    if (!email || email.trim() === "" || email.trim().length > 100) {
      return res.status(400).json({
        message:
          "El campo email no puede estar vacío ni superar los 100 caracteres.",
      });
    }

    if (!password || password.trim() === "" || password.trim().length > 100) {
      return res.status(400).json({
        message:
          "El campo password no puede estar vacío ni superar los 100 caracteres.",
      });
    }

    const user = await UserModel.create({
      name,
      email,
      password,
    });

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
