import { useState, useEffect } from "react";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcumbs";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { getFornecedor } from "../api/getFornecedor";
import { deleteFornecedor } from "../api/deleteFornecedor";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

const texts = {
  deleteSuccess: "O fornecedor foi deletado com sucesso!",
  deleteFailure: "Houve um erro ao deletar o fornecedor.",
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
};

function getBreadcrumbs() {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Gerenciamento de Fornecedores", link: "/fornecedores" },
  ];
}

const emptyFornecedor = {
  id: 0,
  name: "",
  status: "",
  person: "",
  created_at: "",
};

export function FornecedorView() {
  const params = useParams();
  const navigate = useNavigate();
  const [fornecedor, setFornecedor] = useState(emptyFornecedor);

  useEffect(() => {
    getFornecedor(Number(params.id)).then((res) => setFornecedor(res));
  }, []);

  async function onClickDelete() {
    const response = await deleteFornecedor(fornecedor.id);
    if (response.success) {
      toast(texts.deleteSuccess);
      navigate("/fornecedores");
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
            {fornecedor.id}
          </span>
          <time
            dateTime={fornecedor.created_at}
            className="flex flex-row gap-2 md:text-xl"
          >
            <h2 className="font-bold italic md:text-xl">Data de Criação:</h2>
            {new Date(fornecedor.created_at).toLocaleDateString("en-GB")}
          </time>
        </div>
        <span className="flex flex-row gap-2 md:text-xl">
          <h2 className="font-bold italic md:text-xl">Nome:</h2>
          {fornecedor.name}
        </span>
        <span className="flex flex-row gap-2 mt-2 md:text-xl">
          <h2 className="font-bold italic md:text-xl">Status:</h2>
          {fornecedor.status}
        </span>
        <span className="flex flex-row gap-2 mt-2 md:text-xl">
          <h2 className="font-bold italic md:text-xl">Pessoa:</h2>
          {fornecedor.person}
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
            to={`/fornecedores/editar/${params.id}`}
          >
            Editar
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
