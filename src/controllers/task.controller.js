import { TaskModel } from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const idTask = req.params.id;
    const task = await TaskModel.findByPk(idTask);

    if (!task) {
      return res.status(404).json({
        message: "No existe tarea con el id especificado",
      });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const insertTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    const tasks = await TaskModel.findAll();

    const taskExist = tasks.find((task) => {
      return task.title.toUpperCase() === title.toUpperCase();
    });

    if (taskExist) {
      return res.status(400).json({
        message: "Ya existe una tarea con el mismo titulo",
      });
    }

    if (!title || title.trim() === "" || title.trim().length > 100) {
      return res.status(400).json({
        message:
          "El título es obligatorio, no puede estar vacío ni superar los 100 caracteres.",
      });
    }

    if (
      !description ||
      description.trim() === "" ||
      description.trim().length > 100
    ) {
      return res.status(400).json({
        message:
          "La descripcion no puede estar vacío ni superar los 100 caracteres.",
      });
    }

    if (typeof isComplete !== "boolean") {
      return res.status(400).json({
        message: "El valor del campo isComplete solo puede ser true o false",
      });
    }

    const task = await TaskModel.create({
      title,
      description,
      isComplete,
    });

    return res.status(201).json({
      message: "Tarea agregada correctamente",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const idTask = req.params.id;
    const task = await TaskModel.findByPk(idTask);
    const { title, description, isComplete } = req.body;

    if (!task) {
      return res.status(404).json({
        message: "No existe tarea con el id especificado para modificar",
      });
    }

    await task.update({
      title,
      description,
      isComplete,
    });

    return res.status(200).json({
      message: "Tarea modificada",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const idTask = req.params.id;
    const task = await TaskModel.findByPk(idTask);

    if (!task) {
      return res.status(404).json({
        message: "No existe tarea con el id especificado para eliminar",
      });
    }

    await task.destroy();

    return res.status(200).json({
      message: "Tarea Eliminada",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
