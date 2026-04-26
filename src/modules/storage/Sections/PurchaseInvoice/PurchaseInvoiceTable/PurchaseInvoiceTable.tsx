import "./PurchaseInvoiceTable.css";

import Input from "../../../../../components/Input/Input";
export default function PurchaseInvoiceTable() {
//   const [data, setData] = useState([
//     { id: 1, name: "صنف 1", quantity: 10, price: 5 },
//     { id: 2, name: "صنف 2", quantity: 20, price: 10 },
//     { id: 3, name: "صنف 3", quantity: 30, price: 15 },
//   ]);
  return (
    <div className="PurchaseInvoice-table-div">
      <table>
        <thead>
            <tr>
                <th>الاسم</th>
                <th>الشركة</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>المجموع</th>
            </tr>
        </thead>
        <tbody>
            {/* -----------------من هنا تحذف----------------- */}

          
            <tr>
                <td>باراسيتامول</td>
                <td>باراسيتامول</td>
                <td>2</td>
                <td><Input w="70%" center="auto"/></td>
                <td>20</td>
            </tr>
            <tr>
                <td>باراسيتامول</td>
                <td>باراسيتامول</td>
                <td>2</td>
                <td><Input w="70%" center="auto"/></td>
                <td>20</td>
            </tr>
            <tr>
                <td>باراسيتامول</td>
                <td>باراسيتامول</td>
                <td>2</td>
                <td><Input w="70%" center="auto"/></td>
                <td>20</td>
            </tr>
            <tr>
                <td>باراسيتامول</td>
                <td>باراسيتامول</td>
                <td>2</td>
                <td><Input w="70%" center="auto"/></td>
                <td>20</td>
            </tr>
            <tr>
                <td>باراسيتامول</td>
                <td>باراسيتامول</td>
                <td>2</td>
                <td><Input w="70%" center="auto"/></td>
                <td>20</td>
            </tr>

            {/* ----------------------الى هنااا---------------- */}
        </tbody>
      </table>
    </div>
  );
}
