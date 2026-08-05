import express from "express";
import { startDB } from "./src/config/database";

const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
