import path from "path";
import * as json from "../json";
import type { Fornecedor } from "../../../shared/types";

type FindFornecedorParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

const fornecedorModelPath = path.join("data", "fornecedores.data");
const fornecedorModelDataPath = path.join(fornecedorModelPath, "fornecedores");

//Encontra Fornecedor por ID
export function findFornecedorById(id: number) {
  try {
    const fornecedor = json.readFileJSON(fornecedorModelDataPath, `${id}.json`);
    return fornecedor;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Listar Fornecedores
export function findFornecedores({
  limit = 10,
  offset = 0,
  search = "",
  order_by = "created_at",
  direction = "desc",
}: FindFornecedorParams = {}) {
  const rawFornecedoresFiles = json.listFilesJSON(fornecedorModelDataPath);
  const fornecedoresFiles = rawFornecedoresFiles.sort((a, b) => {
    const idA = parseInt(a);
    const idB = parseInt(b);
    return idA - idB;
  });

  const fornecedores: Fornecedor[] = fornecedoresFiles.map((file) => {
    return json.readFileJSON(fornecedorModelDataPath, file);
  });

  const normalizedSearch = normalizeText(search);

  const searchedFornecedores =
    normalizedSearch.length === 0
      ? fornecedores
      : fornecedores.filter(({ name, status, person }) => {
          const normalizedName = normalizeText(name);
          const normalizedStatus = normalizeText(status);
          const normalizedPerson = normalizeText(person);
          return (
            normalizedName.includes(normalizedSearch) ||
            normalizedStatus.includes(normalizedSearch) ||
            normalizedPerson.includes(normalizedSearch)
          );
        });

  const sortedFornecedores = searchedFornecedores.sort(
    (fornecedorA, fornecedorB) => {
      if (order_by === "created_at") {
        const createdAtFornecedorA = Date.parse(fornecedorA.created_at);
        const createdAtFornecedorB = Date.parse(fornecedorB.created_at);
        return createdAtFornecedorA - createdAtFornecedorB;
      } else if (order_by === "person") {
        const titleFornecedorA = fornecedorA.person;
        const titleFornecedorB = fornecedorB.person;
        if (titleFornecedorA < titleFornecedorB) {
          return -1;
        } else if (titleFornecedorB > titleFornecedorA) {
          return 1;
        } else {
          return 0;
        }
      } else {
        const idFornecedorA = fornecedorA.id;
        const idFornecedorB = fornecedorB.id;
        return idFornecedorA - idFornecedorB;
      }
    }
  );

  const directedFornecedores =
    direction === "asc" ? sortedFornecedores : sortedFornecedores.reverse();

  const count = directedFornecedores.length;
  const paginatedFornecedoresFiles = directedFornecedores.slice(
    offset,
    limit + offset
  );

  return {
    count,
    fornecedores: paginatedFornecedoresFiles,
  };
}

//Deleta Fornecedor por Id
export function deleteFornecedorById(id: number) {
  let fornecedor: Fornecedor;
  try {
    fornecedor = json.readFileJSON(fornecedorModelDataPath, `${id}.json`);
    json.deleteFileJSON(fornecedorModelDataPath, `${id}.json`);
  } catch (error) {
    return {
      success: false,
      fornecedor: null,
    };
  }

  return {
    success: true,
    fornecedor,
  };
}

//Criar Fornecedor
export function createFornecedor(
  fornecedorData: Omit<Fornecedor, "id" | "created_at">
) {
  let fornecedor: Fornecedor;
  const fornecedoresLatestId = json.readFileJSON(
    fornecedorModelPath,
    "fornecedoresLatestId.json"
  );
  const fornecedorId: number = fornecedoresLatestId.latestId + 1;
  json.partialUpdateFileJSON(
    [fornecedorModelPath, "fornecedoresLatestId.json"],
    {
      latestId: fornecedorId,
    }
  );

  try {
    fornecedor = {
      ...fornecedorData,
      id: fornecedorId,
      created_at: new Date().toJSON(),
    };
    json.createFileJSON(
      [fornecedorModelDataPath, `${fornecedorId}.json`],
      fornecedor
    );
  } catch (error) {
    console.log(error);
    return {
      success: false,
      fornecedor: null,
    };
  }

  return {
    success: true,
    fornecedor,
  };
}

//Atualizar Fornecedor
export function updateFornecedorById(id: number, fornecedorData: Fornecedor) {
  let fornecedor: Fornecedor;
  try {
    json.partialUpdateFileJSON(
      [fornecedorModelDataPath, `${id}.json`],
      fornecedorData
    );
    fornecedor = json.readFileJSON(fornecedorModelDataPath, `${id}.json`);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      fornecedor: null,
    };
  }

  return {
    success: true,
    fornecedor,
  };
}

//Sobrescrever Fornecedor
export function overwriteFornecedorById(
  id: number,
  fornecedorData: Fornecedor
) {
  const fornecedor: Fornecedor = {
    ...fornecedorData,
    id,
  };

  try {
    json.overwriteFileJSON([fornecedorModelDataPath, `${id}.json`], fornecedor);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      fornecedor: null,
    };
  }

  return {
    success: true,
    fornecedor,
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
