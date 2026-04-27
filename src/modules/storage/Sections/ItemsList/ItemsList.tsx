import "./ItemsList.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Table from "../../../../components/Table/Table";
import Search from "../../../../components/Search/Search";
import type { Item } from "../../types";
import { useContext } from "react";
import { StorageContext } from "../../StorageContext" ;
export default function ItemsList() {

const {setShowItemInfo , showPurchaseInvoice} = useContext(StorageContext)! ;


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
    if(!showPurchaseInvoice) {
      setShowItemInfo(true) ;
      console.log(item);
    }
    
  }
  return (
    <PopupWindowLayout w="95%" h="100%" PopupWindowLayoutStyle="PopupWindowLayoutStyle">
      <>
      <Search placeholder="البحث عن دواء" w="80%" m="10px" />
        <Table data={data} columns={col} onRowClick={onRowClick}  w="95%"/>
      </>
    </PopupWindowLayout>
  );
}
