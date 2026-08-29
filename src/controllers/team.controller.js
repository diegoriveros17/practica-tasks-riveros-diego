// import { TeamModel } from "../models/team.models.js";
// import { UserModel } from "../models/user.model.js";
// import { UserTeamModel } from "../models/user_team.model.js";
import { UserModel, TeamModel, UserTeamModel } from "../models/index.js";
import { matchedData, validationResult } from "express-validator";

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
    const { id } = matchedData(req, { locations: ["params"] });

    const teamExist = await TeamModel.findByPk(id);
    if (!teamExist) {
      return res
        .status(404)
        .json({ message: "No existe un equipo asociado con este id" });
    }

    const team = await TeamModel.findByPk(id, {
      attributes: { exclude: ["id"] },
    });

    return res.status(200).json(team);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const insertTeam = async (req, res) => {
  try {
    const data = matchedData(req);
    const { name } = data;

    const teamExist = await TeamModel.findOne({ where: { name } });
    if (teamExist) {
      return res.status(400).json({
        message: "Ya existe un equipo creado con este nombre",
      });
    }

    const team = await TeamModel.create(data);

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
    const data = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const { name } = data;

    const nameExist = await TeamModel.findOne({ where: { name } });
    if (nameExist) {
      return res.status(400).json({
        message: "Ya existe un equipo creado con este nombre",
      });
    }

    const teamExist = await TeamModel.findByPk(id);
    if (!teamExist) {
      return res.status(404).json({
        message: "No existe un equipo registrado con este id",
      });
    }

    const team = await teamExist.update(data);

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
    const { id } = matchedData(req, { locations: ["params"] });

    const teamExist = await TeamModel.findByPk(id);
    if (!teamExist) {
      return res.status(404).json({
        message: "No existe un equipo registrado con este id",
      });
    }

    const team = await teamExist.destroy();

    return res.status(200).json({
      message: "Team eliminado",
      team,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const addUserToTeam = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { user_id, team_id } = validateData;

    const userExist = await UserModel.findByPk(user_id);
    if (!userExist) {
      return res.status(404).json({
        message: "No existe el usuario con el que intenta asociar el equipo",
      });
    }

    const teamExist = await TeamModel.findByPk(team_id);
    if (!teamExist) {
      return res.status(404).json({
        message: "No existe el equipo con el que intenta asociar el usuario",
      });
    }

    const userTeam = await UserTeamModel.create(validateData);

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
