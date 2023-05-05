import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { TableFornecedores } from "../components/TableFornecedores";
import { LinkButton } from "../components/LinkButton";
import { Fornecedor } from "../../../shared/types";
import "../App.css";
import { Breadcrumbs } from "../components/Breadcumbs";
import { SearchBar } from "../components/SearchBar";
import { config } from "../config";
import { createUrlParams } from "../createUrlParams";
import { getFornecedores } from "../api/getFornecedores";
import { asyncDebounce } from "../asyncDebounce";
import { PaginationButtons } from "../components/PaginationButtons";

const pageSize = config.pageSize;
const debouncedGetNotepads = asyncDebounce(getFornecedores, 1000);

const initialFornecedorList = {
  count: 0,
  fornecedores: [] as Fornecedor[],
};

const headers = [
  "ID",
  "Fornecedor",
  "Status",
  "Pessoa",
  "Data Cadastro",
  "Opções",
];

export function FornecedoresView() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || undefined;
  const [search, setSearch] = useState(initialSearch ?? "");
  const [orderBy, setOrderBy] = useState("created_at");
  const [direction, setDirection] = useState("desc");
  const [fornecedorList, setFornecedorList] = useState(initialFornecedorList);
  const pageCount = Math.ceil(fornecedorList.count / pageSize);
  const pageParams = createUrlParams({ search, direction, order_by: orderBy });

  const getFornecedorParams = {
    offset: 0,
    limit: pageSize,
    search: search.length > 0 ? search : undefined,
    direction,
    order_by: orderBy,
  };

  const [page, setPage] = useState(1);
  const limit = pageSize;
  const offset = pageSize * (page - 1);

  useEffect(() => {
    debouncedGetNotepads(getFornecedorParams).then(setFornecedorList);
    setPage(1);
  }, [direction, orderBy, search]);

  useEffect(() => {
    debouncedGetNotepads({ ...getFornecedorParams, offset }).then(
      setFornecedorList
    );
  }, [page]);

  return (
    <div>
      <Breadcrumbs
        links={[{ title: "Página inicial", link: "/" }]}
      ></Breadcrumbs>
      <div className="bg-white w-11/12 h-full rounded-xl mx-auto mt-10 p-3 md:max-w-[900px]">
        <div className="flex flex-col justify-center items-center md:flex-row">
          <div className="p-3 flex justify-start items-center grow">
            <h2 className="text-xl">Gerenciamento de Fornecedores</h2>
          </div>
          <div className="flex">
            <LinkButton
              to="/fornecedores/addFornecedor"
              className="p-2 bg-green-700 text-white rounded-xl hover:bg-green-500"
            >
              Adicionar Fornecedor
            </LinkButton>
          </div>
        </div>
        <SearchBar
          search={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="w-full flex gap-10">
          <select
            value={orderBy}
            className="bg-transparent py-2 px-6 border rounded-3xl flex-1 focus:outline-none cursor-pointer"
            onChange={(event) => setOrderBy(event.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Fornecedor</option>
            <option value="created_at">Data Criação</option>
          </select>
          <select
            value={direction}
            onChange={(event) => setDirection(event.target.value)}
            className="bg-white py-2 px-6 border rounded-3xl flex-1 cursor-pointer focus:outline-none"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <TableFornecedores head={headers} rows={fornecedorList.fornecedores} />
        <div>
          <PaginationButtons
            currentPage={page}
            pageCount={pageCount}
            onClick={(event) => {
              let target = event.target as HTMLInputElement;
              setPage(Number(target.value));
            }}
          ></PaginationButtons>
        </div>
      </div>
    </div>
  );
}
