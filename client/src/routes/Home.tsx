import { LinkButton } from "../components/LinkButton";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center mb-16">
      <div className="w-full text-white py-12 px-2 flex justify-center text-xl text-center md:text-2xl lg:text-4xl">
        <h2>Seja Bem Vindo ao Portal dos Recursos Humanos da Empresa</h2>
      </div>
      <div
        id="div-card"
        className="bg-white w-[300px] h-[300px] rounded-xl md:w-[700px] flex flex-col gap-6 p-3 md:justify-center md:h-[220px]"
      >
        <h2 className="text-xl font-bold text-center mt-6 md:text-2xl md:m-0">
          Selecione a opção:
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <LinkButton
            to="/funcionarios"
            className="bg-green-800 hover:bg-green-600 text-white text-xl text-center p-1  md:text-2xl rounded-lg"
          >
            Gerenciamento de Funcionários
          </LinkButton>
          <LinkButton
            to="/fornecedores"
            className="bg-blue-800 hover:bg-blue-600 text-white text-xl text-center p-1 md:text-2xl rounded-lg"
          >
            Gerenciamento de Fornecedores
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
