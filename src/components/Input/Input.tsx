import "./Input.css";

type Props = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  type?: string;
};

export default function Input({
  label,
  value,
  onChange,
  onClick,
  type = "text",}: Props) {
  return (
    <div className="input-div" onClick={onClick}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
