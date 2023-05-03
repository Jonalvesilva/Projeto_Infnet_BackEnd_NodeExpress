import type { Funcionario } from "../../../shared/types";
import { FaUserEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

export type field = {
  head: String[];
  rows: Funcionario[];
};

export function TableFuncionarios({ head, rows }: field) {
  return (
    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
      <thead className="text-white">
        {rows.map((element, index) => {
          return (
            <tr
              key={index}
              className="bg-blue-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-6 sm:mb-0"
            >
              {head.map((dados, index) => {
                return (
                  <th key={index} className="p-2 text-center h-11">
                    {dados}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody className="flex-1 sm:flex-none">
        {rows.map((element, index) => {
          return (
            <tr
              key={index}
              className="flex flex-col flex-no wrap sm:table-row mb-6 sm:mb-0"
            >
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.id}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.name}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.surname}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.title}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.salary}
              </td>
              <td className="border-grey-light border hover:bg-gray-100 p-2 h-11 sm:text-center">
                {element.created_at}
              </td>
              <td className="border-grey-light border p-2 h-11">
                <div className="flex gap-6 justify-center items-center">
                  <Link to="/">
                    <div className="flex justify-center items-center gap-2 hover:bg-gray-200">
                      <FaUserEdit size={25}>Editar</FaUserEdit>Editar
                    </div>
                  </Link>
                  <Link to="/fornecedores">
                    <div className="flex justify-center items-center gap-1 hover:bg-gray-200">
                      <TiDelete size={25}>Editar</TiDelete>Deletar
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
