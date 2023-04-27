import { Link } from "react-router-dom";

type tipo = {
  to: string;
  className: string;
  children: string;
};

export function LinkButton(props: tipo) {
  return (
    <Link to={props.to} className={props.className}>
      {props.children}
    </Link>
  );
}
