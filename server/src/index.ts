import express, { Request, Response } from "express";

const app = express();
const host = "localhost";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).end("Servidor EndPoint Funcionando");
});

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
