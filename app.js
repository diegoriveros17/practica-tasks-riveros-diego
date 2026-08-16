import express from "express";
import { startDB } from "./src/config/database.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import dotenv from "dotenv";
import { profileRouter } from "./src/routes/profile.routes.js";
import { teamRouter } from "./src/routes/team.routes.js";
import { UserTeamModel } from "./src/models/user_team.model.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/", taskRouter);

app.use("/api/", userRouter);

app.use("/api/", profileRouter);

app.use("/api/", teamRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
