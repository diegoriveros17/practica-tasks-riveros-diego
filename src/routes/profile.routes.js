import { Router } from "express";

import {
  deleteProfile,
  getAllProfiles,
  getProfileById,
  insertProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

export const profileRouter = Router();

profileRouter.get("/profiles", getAllProfiles);

profileRouter.get("/profiles/:id", getProfileById);

profileRouter.post("/profiles", insertProfile);

profileRouter.put("/profiles/:id", updateProfile);

profileRouter.delete("/profiles/:id", deleteProfile);
