import express from "express";
import * as funcionarioService from "./funcionarios.serv";

export const funcionarioController = express.Router();

//Listagem de Funcionarios
funcionarioController.get("/", (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const order_by = req.query.order_by as string | undefined;
  const direction = req.query.direction as string | undefined;
  const search =
    req.query.search !== undefined ? req.query.search.toString() : undefined;
  const funcionarios = funcionarioService.findFuncionarios({
    limit,
    offset,
    search,
    order_by,
    direction,
  });
  res.status(200).json(funcionarios);
});

// Pega um funcionario pelo ID
funcionarioController.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const funcionario = funcionarioService.findFuncionarioById(id);
  if (funcionario === null) {
    res.sendStatus(404);
  } else {
    res.status(200).json(funcionario);
  }
});

// Cria um funcionario
funcionarioController.post("/", (req, res) => {
  const response = funcionarioService.createFuncionario(req.body);
  res.status(201).json(response);
});

// Sobrescreve um funcionario pelo ID
funcionarioController.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = funcionarioService.overwriteFuncionarioById(id, req.body);
  res.status(200).json(response);
});

// Atualiza parcialmente um funcionario pelo ID
funcionarioController.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = funcionarioService.updateFuncionarioById(id, req.body);
  res.status(200).json(response);
});

// Deleta um funcionario pelo ID
funcionarioController.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = funcionarioService.deleteFuncionarioById(id);
  res.status(200).json(response);
});
