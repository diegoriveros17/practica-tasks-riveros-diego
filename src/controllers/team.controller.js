import { TeamModel } from "../models/team.models.js";
import { UserModel } from "../models/user.model.js";
import { UserTeamModel } from "../models/user_team.model.js";

export const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.findAll();

    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const idTeam = req.params.id;
    const team = await TeamModel.findByPk(idTeam);

    if (!team) {
      return res.status(404).json({
        message: "No existe un equipo con el id especificado",
      });
    }
    return res.status(200).json(team);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const insertTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const teamExist = await TeamModel.findOne({ where: { name } });

    if (teamExist) {
      return res.status(400).json({
        message: "Ya existe una equipo creado con este nombre",
      });
    }

    const team = await TeamModel.create({
      name,
      description,
    });

    return res.status(201).json({
      message: "Team creado correctamente",
      team,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const idTeam = req.params.id;
    const team = await TeamModel.findByPk(idTeam);

    if (!team) {
      return res.status(404).json({
        message: "No existe un equipo asociado al id que desea modificar",
      });
    }
    const { name, description } = req.body;

    await team.update({
      name,
      description,
    });

    return res.status(200).json({
      message: "Equpo actualizado",
      team,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const idTeam = req.params.id;
    const team = await TeamModel.findByPk(idTask);

    if (!team) {
      return res.status(404).json({
        message: "No existe un equipo asociado al id que desea eliminar",
      });
    }

    await team.destroy();

    return res.status(200).json({
      message: "Team eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const addUserToTeam = async (req, res) => {
  try {
    const { user_id, team_id } = req.body;

    const user = await UserModel.findByPk(user_id);
    const team = await TeamModel.findByPk(team_id);

    if (!user || !team) {
      return res
        .status(404)
        .json({ message: "Usuario o Equipo no encontrado" });
    }

    const userTeam = await UserTeamModel.create({
      user_id,
      team_id,
    });

    return res.status(201).json({
      message: "Usuario asignado al equipo correctamente",
      userTeam,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
