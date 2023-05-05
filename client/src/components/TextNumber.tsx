export type TextNumberProps = {
  className?: string;
  onKeyDown?: (event: Event) => void;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};
export const blockInvalidChar = (e: any) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

export function TextNumber({
  className,
  value,
  placeholder,
  onChange,
}: TextNumberProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        if (event.target.value[0] === "0") {
          return;
        }
        return onChange(event.target.value);
      }}
      className={className}
      onKeyDown={blockInvalidChar}
      type="number"
      required
    />
  );
}
