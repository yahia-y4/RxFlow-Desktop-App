import "./Table.css";
import type { Item } from "../../modules/storage/types";

type Column = {
  key: string;
  label: string;
};

type Props = {
  h?: string;
  w?: string;
  data: Item[];
  columns: Column[];
  onRowClick?:(item: Item) => void;
};

export default function Table({ data, columns, onRowClick, w, h }: Props) {
  return (
    <div className="table-div" style={{ width: w, height: h }}>
      <table>
        <thead>
            <tr>
        {
            columns.map((column)=>(

                <th key={column.key}>{column.label}</th>
            ))
        }
        </tr>
        </thead>
        <tbody>


            {
                data.map((item,index)=>(
                    <tr key={index} onClick={()=>onRowClick?.(item)}>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                    </tr>
                ))
            }


        </tbody>
      </table>
    </div>
  );
}
