import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const TaskModel = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    is_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  },
);

//RELACION UNO A MUCHOS
TaskModel.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });

UserModel.hasMany(TaskModel, { foreignKey: "user_id", as: "tareas" });
