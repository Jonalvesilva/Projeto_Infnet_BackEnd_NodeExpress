import express from "express";
import * as fornecedorService from "./fornecedores.serv";

export const fornecedorController = express.Router();

//Listagem de Fornecedores
fornecedorController.get("/", (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const order_by = req.query.order_by as string | undefined;
  const direction = req.query.direction as string | undefined;
  const search =
    req.query.search !== undefined ? req.query.search.toString() : undefined;
  const fornecedores = fornecedorService.findFornecedores({
    limit,
    offset,
    search,
    order_by,
    direction,
  });
  res.status(200).json(fornecedores);
});

// Pega um fornecedor pelo ID
fornecedorController.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const fornecedor = fornecedorService.findFornecedorById(id);
  if (fornecedor === null) {
    res.sendStatus(404);
  } else {
    res.status(200).json(fornecedor);
  }
});

// Cria um fornecedor
fornecedorController.post("/", (req, res) => {
  const response = fornecedorService.createFornecedor(req.body);
  res.status(201).json(response);
});

// Sobrescreve um fornecedor pelo ID
fornecedorController.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = fornecedorService.overwriteFornecedorById(id, req.body);
  res.status(200).json(response);
});

// Atualiza parcialmente um fornecedor pelo ID
fornecedorController.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = fornecedorService.updateFornecedorById(id, req.body);
  res.status(200).json(response);
});

// Deleta um fornecedor pelo ID
fornecedorController.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = fornecedorService.deleteFornecedorById(id);
  res.status(200).json(response);
});
