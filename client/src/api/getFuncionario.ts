import { api } from "./api";
import { Funcionario } from "../../../shared/types";

export async function getFuncionario(id: number): Promise<Funcionario> {
  const res = await api.get(`/funcionarios/${id}`);
  const funcionario = res.data;
  return funcionario;
}
