import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TableFuncionarios } from "../components/TableFuncionarios";
import { LinkButton } from "../components/LinkButton";
import { Funcionario, Fornecedor } from "../../../shared/types";
import "../App.css";
import { Breadcrumbs } from "../components/Breadcumbs";
import { SearchBar } from "../components/SearchBar";
import { config } from "../config";
import { createUrlParams } from "../createUrlParams";

const pageSize = config.pageSize;

const initialFuncionarioList = {
  count: 0,
  funcionarios: [] as Funcionario[],
};

const headers = [
  "ID",
  "Nome",
  "Sobrenome",
  "Cargo",
  "Salario",
  "Data Criação",
  "Opções",
];

const teste = [
  {
    id: 1,
    name: "Jonathan",
    surname: "Alves",
    title: "Desenvolvedor Junior",
    salary: "R$ 3000",
    created_at: "1/1/2001",
  },

  {
    id: 2,
    name: "Wesley",
    surname: "Alves",
    title: "Desenvolvedor Senior",
    created_at: "20/3/2012",
    salary: "R$ 9000",
  },
];

export function FuncionariosView() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || undefined;
  const [search, setSearch] = useState(initialSearch ?? "");
  const [orderBy, setOrderBy] = useState("created_at");
  const [direction, setDirection] = useState("desc");
  const [funcionarioList, setFuncionarioList] = useState(
    initialFuncionarioList
  );
  const pageCount = Math.ceil(funcionarioList.count / pageSize);
  const pageParams = createUrlParams({ search, direction, order_by: orderBy });
  const getFuncionarioParams = {
    offset: 0,
    limit: pageSize,
    search: search.length > 0 ? search : undefined,
    direction,
    order_by: orderBy,
  };

  return (
    <div>
      <Breadcrumbs
        links={[{ title: "Página inicial", link: "/" }]}
      ></Breadcrumbs>
      <div className="bg-white w-11/12 h-full rounded-xl mx-auto mt-10 p-3 md:max-w-[900px]">
        <div className="flex flex-col justify-center items-center md:flex-row">
          <div className="p-3 flex justify-start items-center grow">
            <h2 className="text-xl">Gerenciamento de Funcionários</h2>
          </div>
          <div className="flex">
            <LinkButton
              to="/addFuncionario"
              className="p-2 bg-green-700 text-white rounded-xl hover:bg-green-500"
            >
              Adicionar Funcionário
            </LinkButton>
          </div>
        </div>
        <SearchBar search="teste" onChange={() => console.log("teste")} />
        <div className="w-full flex gap-10">
          <select
            value={orderBy}
            className="bg-transparent py-2 px-6 border rounded-3xl flex-1 focus:outline-none cursor-pointer"
            onChange={(event) => setOrderBy(event.target.value)}
          >
            <option value="id">ID</option>
            <option value="title">Título</option>
            <option value="created_at">Data de criação</option>
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
        <TableFuncionarios head={headers} rows={teste} />
      </div>
    </div>
  );
}
