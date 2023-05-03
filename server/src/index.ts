import express, { Request, Response } from "express";
import { fornecedorController } from "./fornecedores/fornecedores.controller";
import { funcionarioController } from "./funcionarios/funcionarios.controller";

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

app.use("/fornecedores", fornecedorController);
app.use("/funcionarios", funcionarioController);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
