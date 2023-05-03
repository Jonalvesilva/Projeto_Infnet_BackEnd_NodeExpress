import path from "path";
import * as json from "../json";
import type { Funcionario } from "../../../shared/types";

type FindFuncionarioParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

const funcionarioModelPath = path.join("data", "funcionarios.data");
const funcionarioModelDataPath = path.join(
  funcionarioModelPath,
  "funcionarios"
);

//Encontra Funcionario por ID
export function findFuncionarioById(id: number) {
  try {
    const funcionario = json.readFileJSON(
      funcionarioModelDataPath,
      `${id}.json`
    );
    return funcionario;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Listar Funcionarios
export function findFuncionarios({
  limit = 10,
  offset = 0,
  search = "",
  order_by = "created_at",
  direction = "desc",
}: FindFuncionarioParams = {}) {
  const rawFuncionariosFiles = json.listFilesJSON(funcionarioModelDataPath);
  const funcionariosFiles = rawFuncionariosFiles.sort((a, b) => {
    const idA = parseInt(a);
    const idB = parseInt(b);
    return idA - idB;
  });

  const funcionarios: Funcionario[] = funcionariosFiles.map((file) => {
    return json.readFileJSON(funcionarioModelDataPath, file);
  });

  const normalizedSearch = normalizeText(search);

  const searchedFuncionarios =
    normalizedSearch.length === 0
      ? funcionarios
      : funcionarios.filter(({ name, surname, title }) => {
          const normalizedName = normalizeText(name);
          const normalizedSurname = normalizeText(surname);
          const normalizedTitle = normalizeText(title);
          return (
            normalizedTitle.includes(normalizedSearch) ||
            normalizedName.includes(normalizedSearch) ||
            normalizedSurname.includes(normalizedSearch)
          );
        });

  const sortedFuncionarios = searchedFuncionarios.sort(
    (funcionarioA, funcionarioB) => {
      if (order_by === "created_at") {
        const createdAtFuncionarioA = Date.parse(funcionarioA.created_at);
        const createdAtFuncionarioB = Date.parse(funcionarioB.created_at);
        return createdAtFuncionarioA - createdAtFuncionarioB;
      } else if (order_by === "title") {
        const titleFuncionarioA = funcionarioA.title;
        const titleFuncionarioB = funcionarioB.title;
        if (titleFuncionarioA < titleFuncionarioB) {
          return -1;
        } else if (titleFuncionarioB > titleFuncionarioA) {
          return 1;
        } else {
          return 0;
        }
      } else {
        const idFuncionarioA = funcionarioA.id;
        const idFuncionarioB = funcionarioB.id;
        return idFuncionarioA - idFuncionarioB;
      }
    }
  );

  const directedFuncionarios =
    direction === "asc" ? sortedFuncionarios : sortedFuncionarios.reverse();

  const count = directedFuncionarios.length;
  const paginatedFuncionariosFiles = directedFuncionarios.slice(
    offset,
    limit + offset
  );

  return {
    count,
    funcionarios: paginatedFuncionariosFiles,
  };
}

//Deleta Funcionario por Id
export function deleteFuncionarioById(id: number) {
  let funcionario: Funcionario;
  try {
    funcionario = json.readFileJSON(funcionarioModelDataPath, `${id}.json`);
    json.deleteFileJSON(funcionarioModelDataPath, `${id}.json`);
  } catch (error) {
    return {
      success: false,
      funcionario: null,
    };
  }

  return {
    success: true,
    funcionario,
  };
}

//Criar Funcionario
export function createFuncionario(
  funcionarioData: Omit<Funcionario, "id" | "created_at">
) {
  let funcionario: Funcionario;
  const funcionariosLatestId = json.readFileJSON(
    funcionarioModelPath,
    "funcionariosLatestId.json"
  );
  const funcionarioId: number = funcionariosLatestId.latestId + 1;
  json.partialUpdateFileJSON(
    [funcionarioModelPath, "funcionariosLatestId.json"],
    {
      latestId: funcionarioId,
    }
  );

  try {
    funcionario = {
      ...funcionarioData,
      id: funcionarioId,
      created_at: new Date().toJSON(),
    };
    json.createFileJSON(
      [funcionarioModelDataPath, `${funcionarioId}.json`],
      funcionario
    );
  } catch (error) {
    console.log(error);
    return {
      success: false,
      funcionario: null,
    };
  }

  return {
    success: true,
    funcionario,
  };
}

//Atualizar Funcionario
export function updateFuncionarioById(
  id: number,
  funcionarioData: Funcionario
) {
  let funcionario: Funcionario;
  try {
    json.partialUpdateFileJSON(
      [funcionarioModelDataPath, `${id}.json`],
      funcionarioData
    );
    funcionario = json.readFileJSON(funcionarioModelDataPath, `${id}.json`);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      funcionario: null,
    };
  }

  return {
    success: true,
    funcionario,
  };
}

//Sobrescrever Funcionario
export function overwriteFuncionarioById(
  id: number,
  funcionarioData: Funcionario
) {
  const funcionario: Funcionario = {
    ...funcionarioData,
    id,
  };

  try {
    json.overwriteFileJSON(
      [funcionarioModelDataPath, `${id}.json`],
      funcionario
    );
  } catch (error) {
    console.log(error);
    return {
      success: false,
      funcionario: null,
    };
  }

  return {
    success: true,
    funcionario,
  };
}

//Normaliza Texto
function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ");
}
