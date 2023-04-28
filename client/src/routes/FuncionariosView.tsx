import { TableFuncionarios } from "../components/TableFuncionarios";
import { LinkButton } from "../components/LinkButton";
import "../App.css";
import { Breadcrumbs } from "../components/Breadcumbs";

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
    createDate: "1/1/2001",
  },

  {
    id: 2,
    name: "Wesley",
    surname: "Alves",
    title: "Desenvolvedor Senior",
    createDate: "20/3/2012",
    salary: "R$ 9000",
  },
];

export function FuncionariosView() {
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
        <TableFuncionarios head={headers} rows={teste} />
      </div>
    </div>
  );
}
