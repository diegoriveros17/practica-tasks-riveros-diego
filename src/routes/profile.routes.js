import { Router } from "express";

import {
  deleteProfile,
  getAllProfiles,
  getProfileById,
  insertProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import {
  createProfileValidation,
  deleteProfileValidation,
  getProfileValidation,
  updateProfileValidation,
} from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validate.js";

export const profileRouter = Router();

profileRouter.get("/profiles", getAllProfiles);

profileRouter.get(
  "/profiles/:id",
  getProfileValidation,
  validate,
  getProfileById,
);

profileRouter.post(
  "/profiles",
  createProfileValidation,
  validate,
  insertProfile,
);

profileRouter.put(
  "/profiles/:id",
  updateProfileValidation,
  validate,
  updateProfile,
);

profileRouter.delete(
  "/profiles/:id",
  deleteProfileValidation,
  validate,
  deleteProfile,
);
