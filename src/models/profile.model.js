import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define(
  "Profile",
  {
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    url_img: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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

//RELACION UNO A UNO
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "usuario" });

UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });
