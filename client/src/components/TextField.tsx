export type TextFieldProps = {
  className?: string;
  onKeyDown?: (event: Event) => void;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function TextField({
  className,
  value,
  placeholder,
  onChange,
}: TextFieldProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={className}
      type="text"
      required
    />
  );
}
