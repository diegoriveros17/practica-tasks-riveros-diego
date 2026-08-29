// import { TaskModel } from "../models/task.model.js";
// import { UserModel } from "../models/user.model.js";
import { UserModel, TaskModel } from "../models/index.js";
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
    const data = matchedData(req);
    const { id } = data;

    const taskExist = await TaskModel.findByPk(id);
    if (!taskExist) {
      return res
        .status(404)
        .json({ message: "No existe una tarea registrada con este id" });
    }

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
    const data = matchedData(req);
    const { title, user_id } = data;

    const userExist = await UserModel.findByPk(user_id);
    if (!userExist) {
      return res.status(404).json({
        message: "La tarea debe estar asociada a un usuario existente",
      });
    }

    const titleExist = await TaskModel.findOne({ where: { title } });
    if (titleExist) {
      return res
        .status(409)
        .json({ message: "Ya existe una tarea registrada con este titulo" });
    }

    const user = await TaskModel.create(data);

    return res.status(201).json({
      message: "Tarea agregada correctamente",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });

    const { title, user_id } = data;

    const titleExist = await TaskModel.findOne({ where: { title } });
    if (titleExist) {
      return res
        .status(409)
        .json({ message: "Ya existe una tarea registrada con este titulo" });
    }

    const userExist = await UserModel.findByPk(user_id);
    if (!userExist) {
      return res.status(404).json({
        message: "La tarea debe estar asociada a un usuario existente",
      });
    }

    const taskExist = await TaskModel.findByPk(id);
    if (!taskExist) {
      return res
        .status(404)
        .json({ message: "No existe una tarea registrada con este id" });
    }

    const task = await taskExist.update(data);

    return res.status(200).json({
      message: "Tarea modificada",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const taskExist = await TaskModel.findByPk(id);
    if (!taskExist) {
      return res
        .status(404)
        .json({ message: "No existe una tarea registrada con este id" });
    }

    const task = await taskExist.destroy();

    return res.status(200).json({
      message: "Tarea Eliminada",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
