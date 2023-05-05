import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../components/TextField";
import { postFornecedor } from "../api/postFornecedor";
import { Breadcrumbs } from "../components/Breadcumbs";
import { SelectField } from "../components/SelectField";

function getBreadcrumbs() {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Gerenciamento de Fornecedores", link: `/fornecedores/` },
  ];
}

const initialCreateFornecedor = {
  name: "",
  status: "Ativa",
  person: "Fisica",
  created_at: "",
};

export function FornecedorCreate() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialCreateFornecedor);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await postFornecedor(form);
    if (response.success) {
      toast("Fornecedor Cadastrado Com Sucesso");
      navigate("/fornecedores");
    } else {
      toast("Falha no Cadastro do Fornecedor. Tente Novamente.");
    }
  }

  return (
    <div>
      <Breadcrumbs links={getBreadcrumbs()} />
      <h1 className="text-center font-bold italic text-white font-serif my-10 text-2xl md:text-3xl ">
        Adicionar Fornecedor
      </h1>
      <form
        className="flex flex-col gap-2 mx-2 md:mx-auto md:max-w-screen-md"
        onSubmit={onSubmit}
      >
        <TextField
          placeholder="Digite o Nome Da Empresa"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
          className="h-12 rounded-xl px-2 my-2 text-lg"
        />
        <div className="flex flex-row w-full justify-between">
          <SelectField
            options={["Fisica", "Juridica"]}
            onChange={(person) => {
              person = person.target.value;
              setForm({ ...form, person });
            }}
            className="h-12 rounded-xl px-2 my-2 text-lg w-[150px] md:w-[350px]"
          />

          <SelectField
            options={["Ativa", "Inativa", "Pendente"]}
            onChange={(status) => {
              status = status.target.value;
              setForm({ ...form, status });
            }}
            className="h-12 rounded-xl px-2 my-2 text-lg w-[150px] md:w-[350px]"
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-400 text-white mt-10 h-12 mb-4 py-2 px-3 rounded-xl uppercase font-bold text-sm"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}
