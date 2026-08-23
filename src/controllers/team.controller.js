import { TeamModel } from "../models/team.models.js";
import { UserModel } from "../models/user.model.js";
import { UserTeamModel } from "../models/user_team.model.js";
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
    const validateData = matchedData(req);
    const { id, ...data } = validateData;

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
    const validateData = matchedData(req);

    await TeamModel.create(validateData);

    return res.status(201).json({
      message: "Team creado correctamente",
      validateData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { id, ...data } = validateData;

    await TeamModel.update(data, {
      where: { id },
    });

    return res.status(200).json({
      message: "Equpo actualizado",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const validateData = matchedData(req);
    const { id } = validateData;

    await TeamModel.destroy({
      where: { id },
    });

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
    const validateData = matchedData(req);
    const { user_id, team_id } = validateData;
    const userTeam = await UserTeamModel.create({ user_id, team_id });

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
