import fs from "fs";
import path from "path";

function fileExists(path: string) {
  return fs.existsSync(path);
}

function isFileJSON(path: string) {
  return path.endsWith(".json");
}

export function readFileJSON(...jsonFile: string[]) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isFileJSON(jsonFilePath)) {
    return JSON.parse(fs.readFileSync(jsonFilePath).toString());
  } else {
    throw new Error("Não foi possível ler o arquivo no local indicado!");
  }
}

export function createFileJSON(jsonFile: string[], jsonContent: any) {
  const jsonFilePath = path.join(...jsonFile);

  if (!fileExists(jsonFilePath) && isFileJSON(jsonFilePath)) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonContent, null));
  } else {
    throw new Error("Não foi possível criar o arquivo no local indicado!");
  }
}

export function deleteFileJSON(...jsonFile: string[]) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isFileJSON(jsonFilePath)) {
    return fs.unlinkSync(jsonFilePath);
  } else {
    throw new Error("Não foi possível deletar o arquivo no local indicado");
  }
}

export function overwriteFileJSON(jsonFile: string[], jsonContent: any) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isFileJSON(jsonFilePath)) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonContent, null));
  } else {
    throw new Error(
      "Não foi possível sobrescrever o arquivo no local indicado!"
    );
  }
}

export function partialUpdateFileJSON(jsonFile: string[], jsonContent: any) {
  const jsonFilePath = path.join(...jsonFile);

  if (!fileExists(jsonFilePath) || !isFileJSON(jsonFilePath)) {
    throw new Error("Não foi possível atualizar o arquivo no local indicado!");
  }

  const currentJsonContent = JSON.parse(
    fs.readFileSync(jsonFilePath).toString()
  );
  const nextJsonContent = {
    ...currentJsonContent,
    ...jsonContent,
  };
  fs.writeFileSync(jsonFilePath, JSON.stringify(nextJsonContent, null));
}

export function listFilesJSON(...jsonPath: string[]) {
  const files = fs.readdirSync(path.join(...jsonPath));
  return files.filter((file) => file.endsWith(".json"));
}
