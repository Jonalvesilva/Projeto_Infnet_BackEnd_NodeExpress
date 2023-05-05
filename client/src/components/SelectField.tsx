import { ChangeEventHandler } from "react";

type props = {
  onChange: (event: any) => void;
  options: String[];
  currentOption?: string;
  className: string;
};

export function SelectField(props: props) {
  return (
    <div>
      <select
        value={props.currentOption}
        className={props.className}
        onChange={props.onChange}
      >
        {props.options.map((element, index) => {
          return (
            <option key={index} value={element.toString()}>
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
}
