import { api } from "./api";
import { Fornecedor } from "../../../shared/types";

type GetFornecedorInput = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

type GetFornecedoresOutput = {
  count: number;
  fornecedores: Fornecedor[];
};

export async function getFornecedores(
  params: GetFornecedorInput = {}
): Promise<GetFornecedoresOutput> {
  const res = await api.get("/fornecedores", {
    params,
  });
  const fornecedores = res.data;
  return fornecedores;
}
