import "dotenv/config";
import express from "express";
import cors from "cors";

//Se impotan las rutas a usar
import { router } from "./routes";

//Se importa la conexión a la db
import db from "./config/mongo";

const PORT = process.env.PORT || 3001;

const app = express();

//Se habilitan los origenes cruzados
app.use(cors({}));

//Para recibir datos en formato json por el body
app.use(express.json());

//Se agregan las rutas al servidor
app.use(router);

db().then( () => console.log("Connection ready") );

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));