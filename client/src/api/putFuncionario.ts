import { api } from "./api";
import type { Funcionario } from "../../../shared/types";

export type PutFuncionarioInput = {
  name: string;
  surname: string;
  title: string;
  salary: string;
};

export type PutFuncionarioOutput = {
  success: boolean;
  funcionario: Funcionario;
};

export async function putFuncionario(
  id: number,
  funcionario: PutFuncionarioInput
): Promise<PutFuncionarioOutput> {
  const res = await api.put(`/funcionarios/${id}`, funcionario);
  return res.data;
}
