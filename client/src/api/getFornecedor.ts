import { api } from "./api";
import { Fornecedor } from "../../../shared/types";

export async function getFornecedor(id: number): Promise<Fornecedor> {
  const res = await api.get(`/fornecedores/${id}`);
  const fornecedor = res.data;
  return fornecedor;
}
