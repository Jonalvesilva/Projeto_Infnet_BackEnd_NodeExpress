import { api } from "./api";
import type { Fornecedor } from "../../../shared/types";

export type PutFornecedorInput = {
  name: string;
  status: string;
  person: string;
};

export type PutFornecedorOutput = {
  success: boolean;
  fornecedor: Fornecedor;
};

export async function putFornecedor(
  id: number,
  fornecedor: PutFornecedorInput
): Promise<PutFornecedorOutput> {
  const res = await api.put(`/fornecedores/${id}`, fornecedor);
  return res.data;
}
