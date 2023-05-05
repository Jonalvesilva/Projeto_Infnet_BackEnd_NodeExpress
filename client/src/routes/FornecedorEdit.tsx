import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../components/TextField";
import { getFornecedor } from "../api/getFornecedor";
import { putFornecedor } from "../api/putFornecedor";
import { Breadcrumbs } from "../components/Breadcumbs";
import { TextNumber } from "../components/TextNumber";
import { SelectField } from "../components/SelectField";

function getBreadcrumbs(title: string, id: number) {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Gerenciamento de Fornecedores", link: `/fornecedores/` },
    { title, link: `/fornecedores/${id}` },
  ];
}

const initialCreateFornecedor = {
  name: "",
  status: "",
  person: "",
  created_at: "",
};

export function FornecedorEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialCreateFornecedor);

  useEffect(() => {
    getFornecedor(Number(params.id)).then((results) =>
      setForm({
        name: results.name,
        person: results.person,
        status: results.status,
        created_at: results.created_at,
      })
    );
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await putFornecedor(Number(params.id), form);
    if (response.success) {
      toast("O fornecedor foi editado com sucesso");
      navigate(`/fornecedores/${params.id}`);
    } else {
      toast("Não foi possível editar o fornecedor");
    }
  }

  return (
    <div>
      <Breadcrumbs
        links={getBreadcrumbs(`Funcionário ID:${params.id}`, Number(params.id))}
      />
      <h1 className="text-center font-bold italic text-white font-serif my-10 text-2xl md:text-3xl ">
        Editar Fornecedor
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
            currentOption={form.person}
            onChange={(person) => {
              person = person.target.value;
              setForm({ ...form, person });
            }}
            className="h-12 rounded-xl px-2 my-2 text-lg w-[150px] md:w-[350px]"
          />

          <SelectField
            options={["Ativa", "Inativa", "Pendente"]}
            currentOption={form.status}
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
          Editar
        </button>
      </form>
    </div>
  );
}
