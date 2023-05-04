import { useState, useEffect } from "react";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcumbs";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { getFuncionario } from "../api/getFuncionario";
import { deleteFuncionario } from "../api/deleteFuncionario";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

const texts = {
  deleteSuccess: "O funcionario foi deletado com sucesso!",
  deleteFailure: "Houve um erro ao deletar o funcionario.",
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
};

function getBreadcrumbs() {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Gerenciamento de Funcionários", link: "/funcionarios" },
  ];
}

const emptyFuncionario = {
  id: 0,
  name: "",
  surname: "",
  title: "",
  salary: "",
  created_at: "",
};

export function FuncionarioView() {
  const params = useParams();
  const navigate = useNavigate();
  const [funcionario, setFuncionario] = useState(emptyFuncionario);

  useEffect(() => {
    getFuncionario(Number(params.id)).then((res) => setFuncionario(res));
  }, []);

  async function onClickDelete() {
    const response = await deleteFuncionario(funcionario.id);
    if (response.success) {
      toast(texts.deleteSuccess);
      navigate("/funcionarios");
    } else {
      toast(texts.deleteFailure);
    }
  }

  return (
    <div>
      <Breadcrumbs links={getBreadcrumbs()}></Breadcrumbs>
      <Card className="bg-white w-[90%] m-auto p-4 leading-8 rounded-md my-8 md:max-w-screen-md">
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">ID:</h2>
            {funcionario.id}
          </span>
          <time
            dateTime={funcionario.created_at}
            className="flex flex-row gap-2 md:text-xl"
          >
            <h2 className="font-bold italic md:text-xl">Data de Criação:</h2>
            {new Date(funcionario.created_at).toLocaleDateString("en-GB")}
          </time>
        </div>
        <span className="flex flex-row gap-2 md:text-xl">
          <h2 className="font-bold italic md:text-xl">Nome:</h2>
          {funcionario.name}
        </span>
        <span className="flex flex-row gap-2 mt-2 md:text-xl">
          <h2 className="font-bold italic md:text-xl">Sobrenome:</h2>
          {funcionario.surname}
        </span>
        <span className="flex flex-row gap-2 mt-2 md:text-xl">
          <h2 className="font-bold italic md:text-xl">Cargo:</h2>
          {funcionario.title}
        </span>
        <span className="flex flex-row gap-2 mt-2 md:text-xl">
          <h2 className="font-bold italic md:text-xl">Salário:</h2>
          {funcionario.salary}
        </span>
        <div className="mt-8 flex flex-row gap-4">
          <Button
            onClick={onClickDelete}
            className="bg-red-600 hover:bg-red-500 btn-text-shadow px-4 py-1 rounded-xl text-white"
          >
            Deletar
          </Button>
          <LinkButton
            className="bg-green-600 hover:bg-green-500 btn-text-shadow px-5 py-1 rounded-xl text-white"
            to={`/funcionarios/editar/${params.id}`}
          >
            Editar
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
