import { Router } from "express";
import {
  addUserToTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  insertTeam,
  updateTeam,
} from "../controllers/team.controller.js";

export const teamRouter = Router();

teamRouter.get("/teams", getAllTeams);

teamRouter.get("/teams/:id", getTeamById);

teamRouter.post("/teams", insertTeam);

teamRouter.put("/teams/:id", updateTeam);

teamRouter.delete("/teams/:id", deleteTeam);

teamRouter.post("/teams/addUser", addUserToTeam);
