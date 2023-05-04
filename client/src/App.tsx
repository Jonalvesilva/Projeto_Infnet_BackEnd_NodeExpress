import React from "react";
import { Appbar } from "./components/Appbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import "./App.css";
import { FuncionariosView } from "./routes/FuncionariosView";
import { FornecedoresView } from "./routes/FornecedoresView";
import { FuncionarioView } from "./routes/FuncionarioView";
import { FuncionarioEdit } from "./routes/FuncionarioEdit";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/funcionarios" element={<FuncionariosView />} />
          <Route path="/fornecedores" element={<FornecedoresView />} />
          <Route path="/funcionarios/:id" element={<FuncionarioView />} />
          <Route
            path="/funcionarios/editar/:id"
            element={<FuncionarioEdit />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
