type tipo = {
  className: string;
  children: React.ReactNode;
  key?: number;
};

export function Card(props: tipo) {
  return <div className={props.className}>{props.children}</div>;
}
