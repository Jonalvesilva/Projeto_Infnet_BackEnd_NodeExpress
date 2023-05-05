import React from "react";
import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import "./App.css";
import { FuncionariosView } from "./routes/FuncionariosView";
import { FuncionarioView } from "./routes/FuncionarioView";
import { FuncionarioEdit } from "./routes/FuncionarioEdit";
import { FuncionarioCreate } from "./routes/FuncionarioCreate";
import { FornecedoresView } from "./routes/FornecedoresView";
import { FornecedorView } from "./routes/FornecedorView";
import { FornecedorEdit } from "./routes/FornecedorEdit";
import { FornecedorCreate } from "./routes/FornecedorCreate";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/funcionarios" element={<FuncionariosView />} />
          <Route path="/funcionarios/:id" element={<FuncionarioView />} />
          <Route
            path="/funcionarios/editar/:id"
            element={<FuncionarioEdit />}
          />
          <Route
            path="/funcionarios/addFuncionario"
            element={<FuncionarioCreate />}
          ></Route>
          <Route path="/fornecedores" element={<FornecedoresView />} />
          <Route path="/fornecedores/:id" element={<FornecedorView />} />
          <Route path="/fornecedores/editar/:id" element={<FornecedorEdit />} />
          <Route
            path="/fornecedores/addFornecedor"
            element={<FornecedorCreate />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
