import { api } from "./api";
import { Funcionario } from "../../../shared/types";

type GetFuncionarioInput = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

type GetFuncionariosOutput = {
  count: number;
  funcionarios: Funcionario[];
};

export async function getFuncionario(
  params: GetFuncionarioInput = {}
): Promise<GetFuncionariosOutput> {
  const res = await api.get("/funcionarios", {
    params,
  });
  const funcionarios = res.data;
  return funcionarios;
}
