import { api } from "./api";
import type { Funcionario } from "../../../shared/types";

export type PostFuncionarioInput = {
  name: string;
  surname: string;
  title: string;
  salary: string;
};

export type PostFuncionarioOutput = {
  success: boolean;
  funcionario: Funcionario;
};

export async function postFuncionario(
  funcionario: PostFuncionarioInput
): Promise<PostFuncionarioOutput> {
  const res = await api.post("/funcionarios", funcionario);
  return res.data;
}
