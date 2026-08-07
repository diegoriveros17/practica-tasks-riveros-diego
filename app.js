import express from "express";
import { startDB } from "./src/config/database.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/", taskRouter);

app.use("/api/", userRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
