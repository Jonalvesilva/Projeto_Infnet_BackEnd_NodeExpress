import { useState } from "react";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";
import { TextField } from "../components/TextField";
import { postFuncionario } from "../api/postFuncionario";
import { Breadcrumbs } from "../components/Breadcumbs";
import { TextNumber } from "../components/TextNumber";

function getBreadcrumbs() {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Gerenciamento de Funcionários", link: `/funcionarios/` },
  ];
}

const initialCreateFuncionario = {
  name: "",
  surname: "",
  title: "",
  salary: "",
  created_at: "",
};

export function FuncionarioCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialCreateFuncionario);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await postFuncionario(form);
    if (response.success) {
      toast("Funcionário Cadastrado Com Sucesso");
      navigate("/funcionarios");
    } else {
      toast("Falha no Cadastro do Funcionário. Tente Novamente.");
    }
  }

  return (
    <div>
      <Breadcrumbs links={getBreadcrumbs()} />
      <h1 className="text-center font-bold italic text-white font-serif my-10 text-2xl md:text-3xl ">
        Adicionar Funcionário
      </h1>
      <form
        className="flex flex-col gap-2 mx-2 md:mx-auto md:max-w-screen-md"
        onSubmit={onSubmit}
      >
        <TextField
          placeholder="Digite o Nome"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
          className="h-12 rounded-xl px-2 my-2 text-lg"
        />
        <TextField
          placeholder="Digite o Sobrenome"
          value={form.surname}
          onChange={(surname) => setForm({ ...form, surname })}
          className="h-12 rounded-xl px-2 my-2 text-lg"
        />
        <TextField
          placeholder="Digite o Cargo"
          value={form.title}
          onChange={(title) => setForm({ ...form, title })}
          className="h-12 rounded-xl px-2 my-2 text-lg"
        />
        <TextNumber
          placeholder="Digite o Salário"
          value={form.salary}
          onChange={(salary) => {
            setForm({ ...form, salary });
          }}
          className="h-12 rounded-xl px-2 my-2 text-lg"
        />

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-400 text-white h-12 mb-4 py-2 px-3 rounded-xl uppercase font-bold btn-text-shadow text-sm"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}
