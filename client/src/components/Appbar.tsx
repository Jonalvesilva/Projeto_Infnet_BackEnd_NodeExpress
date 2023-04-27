import { Link } from "react-router-dom";

const props = {
  logotipo: "logotipo.png",
  title: "Publicacate Engenharia",
};

export function Appbar() {
  return (
    <div className="h-[100px] w-full flex bg-slate-900 sticky">
      <div id="div-logo" className="w-[250px]">
        <Link to="/">
          <img src={props.logotipo} className="w-full h-full p-3" alt=""></img>
        </Link>
      </div>
      <div
        id="div-title"
        className="w-full flex text-white text-md font-bold pr-2 justify-end items-center md:text-2xl lg:text-3xl"
      >
        <h2>{props.title}</h2>
      </div>
    </div>
  );
}
