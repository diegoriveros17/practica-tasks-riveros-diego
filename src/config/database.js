import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks_users_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Conexion con la BD establecida");
  } catch (error) {
    console.error(`No se pudo conectar con la BD ${error}`);
  }
};
