import express from "express";
import { startDB } from "./src/config/database.js";
import { taskRouter } from "./src/routes/task.route.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/", taskRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
