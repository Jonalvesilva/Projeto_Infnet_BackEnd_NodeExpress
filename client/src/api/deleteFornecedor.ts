import { api } from "./api";
import { Fornecedor } from "../../../shared/types";

export type DeleteFornecedorOutput = {
  success: boolean;
  fornecedor: Fornecedor;
};

export async function deleteFornecedor(
  id: number
): Promise<DeleteFornecedorOutput> {
  const res = await api.delete(`/fornecedores/${id}`);
  const fornecedor = res.data;
  return fornecedor;
}
