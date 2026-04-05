import "./Input.css";

type Props = {
    w?:string;
  label?: string;
  value?: string;
  placeholder?:string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  type?: string;
};

export default function Input({
  label,
  value,
  placeholder,
  w,
  onChange,
  onClick,
  type = "text",}: Props) {
  return (
    <div className="input-div" onClick={onClick} style={{ width: w }}>
      {label && <label>{label}</label>}
      <input
      placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
