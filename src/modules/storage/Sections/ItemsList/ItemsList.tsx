import "./ItemsList.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Table from "../../../../components/Table/Table";
import type { Item } from "../../types";
export default function ItemsList() {
  const data = [
    {
      name: "yahia",
      company: "company",
      form: "Shape 1",
      concent: 50,
      sell_price: 100,
      quantity: 10,
      expiry_date: "2023-12-31",
 
    },
    {
      name: "yahia",
      company: "Company A",
      form: "Shape 1",
      concent: 50,
      sell_price: 100,
      quantity: 10,
      expiry_date: "2023-12-31",
    },
    {
      name: "yahia",
      company: "Company A",
      form: "Shape 1",
      concent: 50,
      sell_price: 100,
      quantity: 10,
      expiry_date: "2023-12-31",
    },
  ];
  const col = [
    { label: "الاسم", key: "name" },
    { label: "الشركة", key: "company" },
    { label: "الشكل", key: "form" },
    { label: "التركيز", key: "concent" },
    { label: "سعر البيع", key: "sell_price" },
    { label: " الكمية", key: "quantity" },
    { label: "تاريخ الانتهاء", key: "expiry_date" },
  ];

  function onRowClick(item: Item) {
    console.log(item);
  }
  return (
    <PopupWindowLayout w="95%" h="100%">
      <>
        <Table data={data} columns={col} onRowClick={onRowClick} />
      </>
    </PopupWindowLayout>
  );
}
