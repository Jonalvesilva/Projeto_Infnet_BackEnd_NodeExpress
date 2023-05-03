export function createUrlParams(objArg: any) {
  const objeto = { ...objArg };
  for (let key of Object.keys(objeto)) {
    if (
      objeto[key] === undefined ||
      objeto[key] === null ||
      objeto[key] === ""
    ) {
      delete objeto[key];
    }
  }
  const urlParams = new URLSearchParams(objeto).toString();
  return urlParams.length > 0 ? `?${urlParams}` : urlParams;
}
