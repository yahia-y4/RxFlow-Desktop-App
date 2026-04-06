import "./Select.css";

type Option = {
  value: string;
  label: string;
};

type MySelectProps = {
  options_v: Option[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value_v?: string;
  placeholder?: string; // ← جديد
  label_v?:string;
  w?:string;
};

export default function Select({
  options_v,
  onChange,
  value_v,
  placeholder,
  label_v,
  w,
}: MySelectProps) {
  return (
    <div className="Select-div" style={{width:w}}>
      {label_v && <label className="Select-label">{label_v}</label>}
      <select className="Select" onChange={onChange} value={value_v}>
        {placeholder && <option value="">{placeholder}</option>}

        {options_v.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
