import "./Table.css";

type Column<T> = {
  key: keyof T;
  label: string;
};

type Props<T extends { id: string }> = {
  h?: string;
  w?: string;
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
};

export default function Table<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  w,
  h,
}: Props<T>) {
console.log("Rendering Table with data:", data);
  return (
    <div className="table-div" style={{ width: w, height: h }}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => onRowClick?.(item)}>
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {String(item[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}