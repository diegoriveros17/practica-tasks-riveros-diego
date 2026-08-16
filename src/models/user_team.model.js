import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { TeamModel } from "./team.models.js";

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
    timestamps: false,
  },
);

// RELACION MUCHOS A MUCHOS
UserModel.belongsToMany(TeamModel, {
  through: UserTeamModel,
  foreignKey: "user_id",
  as: "equipos",
});

TeamModel.belongsToMany(UserModel, {
  through: UserTeamModel,
  foreignKey: "team_id",
  as: "miembros",
});
