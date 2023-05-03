import { api } from "./api";
import type { Fornecedor } from "../../../shared/types";

export type PostFornecedorInput = {
  name: string;
  status: string;
  person: string;
};

export type PostFornecedorOutput = {
  success: boolean;
  fornecedor: Fornecedor;
};

export async function postFornecedor(
  fornecedor: PostFornecedorInput
): Promise<PostFornecedorOutput> {
  const res = await api.post("/fornecedores", fornecedor);
  return res.data;
}
