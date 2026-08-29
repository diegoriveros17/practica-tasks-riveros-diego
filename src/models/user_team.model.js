import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
// import { UserModel } from "./user.model.js";
// import { TeamModel } from "./team.models.js";

export const UserTeamModel = sequelize.define(
  "User_Team",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
  },
);
