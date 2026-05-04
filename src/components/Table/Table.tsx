import "./Table.css";

type Column<T, K extends keyof T = keyof T> = {
  key: K;
  label: string;
  render?: (value: T[K], item: T) => React.ReactNode;
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
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
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
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
