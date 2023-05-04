type tipo = {
  className: string;
  children: string;
  onClick: () => void;
};

export function Button(props: tipo) {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
}
