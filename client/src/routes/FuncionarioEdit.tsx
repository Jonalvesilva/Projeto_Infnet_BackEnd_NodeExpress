import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../components/TextField";
import { putFuncionario } from "../api/putFuncionario";
import { Breadcrumbs } from "../components/Breadcumbs";

function getBreadcrumbs(title: string, id: number) {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Gerenciamento de Funcionários", link: `/funcionarios/` },
    { title, link: `/funcionarios/${id}` },
  ];
}

export function FuncionarioEdit() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Breadcrumbs
        links={getBreadcrumbs(`Funcionário ID:${params.id}`, Number(params.id))}
      />
    </div>
  );
}
