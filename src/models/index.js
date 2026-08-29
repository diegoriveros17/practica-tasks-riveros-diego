import { UserModel } from "./user.model.js";
import { TaskModel } from "./task.model.js";
import { UserTeamModel } from "./user_team.model.js";
import { TeamModel } from "./team.models.js";
import { ProfileModel } from "./profile.model.js";

UserModel.hasMany(TaskModel, { foreignKey: "user_id", as: "tareas" });
TaskModel.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });

UserModel.beforeDestroy(async (user, options) => {
  await TaskModel.destroy({
    where: { user_id: user.id },
    transaction: options.transaction,
  });
});

UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "usuario" });

UserModel.beforeDestroy(async (user, options) => {
  await ProfileModel.destroy({
    where: { user_id: user.id },
    transaction: options.transaction,
  });
});

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

export { UserModel, TaskModel, TeamModel, ProfileModel, UserTeamModel };
