import { Router } from "express";
import {
  addUserToTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  insertTeam,
  updateTeam,
} from "../controllers/team.controller.js";

import { validate } from "../middlewares/validate.js";
import {
  createTeamUserValidation,
  createTeamValidation,
  deleteTeamValidation,
  getTeamValidation,
  updateTeamValidation,
} from "../middlewares/validations/team.validation.js";

export const teamRouter = Router();

teamRouter.get("/teams", getAllTeams);

teamRouter.get("/teams/:id", getTeamValidation, validate, getTeamById);

teamRouter.post("/teams", createTeamValidation, validate, insertTeam);

teamRouter.put("/teams/:id", updateTeamValidation, validate, updateTeam);

teamRouter.delete("/teams/:id", deleteTeamValidation, validate, deleteTeam);

teamRouter.post(
  "/teams/addUser",
  createTeamUserValidation,
  validate,
  addUserToTeam,
);
