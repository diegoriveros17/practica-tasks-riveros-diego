import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData, validationResult } from "express-validator";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      attributes: {
        exclude: ["id", "user_id"],
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["id", "password"],
          },
        },
      ],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { id } = validateData;
    const task = await TaskModel.findByPk(id, {
      attributes: {
        exclude: ["id", "user_id"],
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["id", "password"],
          },
        },
      ],
    });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const insertTask = async (req, res) => {
  try {
    const validateData = matchedData(req);

    await TaskModel.create(validateData);

    return res.status(201).json({
      message: "Tarea agregada correctamente",
      validateData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { id, ...data } = validateData;
    console.log(data);

    await TaskModel.update(data, {
      where: { id },
    });

    return res.status(200).json({
      message: "Tarea modificada",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { id } = validateData;

    await TaskModel.destroy({ where: { id } });

    return res.status(200).json({
      message: "Tarea Eliminada",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
