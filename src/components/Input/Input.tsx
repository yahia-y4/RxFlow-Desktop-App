import "./Input.css";

type Props = {
    w?:string;
  label?: string;
  value?: string;
  placeholder?:string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  type?: string;
  center?:string;  // auto
};

export default function Input({
  label,
  value,
  placeholder,
  w,
  onChange,
  onClick,
  center,
  type = "text",}: Props) {
  return (
    <div className="input-div" onClick={onClick} style={{ width: w , margin:center}}>
      {label && <label>{label}</label>}
      <input placeholder={placeholder} type={type}   value={value}onChange={(e) => onChange?.(e.target.value)}/>
  
    </div>
  );
}
