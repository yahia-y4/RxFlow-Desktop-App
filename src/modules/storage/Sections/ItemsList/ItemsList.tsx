import "./ItemsList.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Table from "../../../../components/Table/Table";
import Search from "../../../../components/Search/Search";
import type { Item, columnType } from "../../types";
import { useContext, useEffect } from "react";
import { StorageContext } from "../../StorageContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../StorageSlice/ItemSlice";
import type { RootState, AppDispatch } from "../../../../store/store.ts";
import { formatDate } from "../../../../utils/formatDate.ts"

export default function ItemsList() {
  const items = useSelector((state: RootState) => state.item.items);

  const dispatch = useDispatch<AppDispatch>();

  const { setShowItemInfo, showPurchaseInvoice } = useContext(StorageContext)!;

  useEffect(() => {
    dispatch(fetchItems());
  },[dispatch]);


  const col: columnType<Item>[] = [
    { label: "الاسم", key: "name" },
    { label: "الشركة", key: "company" },
    { label: "الشكل", key: "form" },
    { label: "التركيز", key: "concent" },
    { label: "سعر البيع", key: "sell_price" },
    { label: " الكمية", key: "quantity" },
    { label: "تاريخ الانتهاء", key: "expiry_date" ,render: (value) => formatDate(String(value ?? ""))},
  ];

  function onRowClick(item: Item) {
    if (!showPurchaseInvoice) {
      setShowItemInfo(true);
      console.log(item);
    }
  }
  return (
    <PopupWindowLayout
      w="95%"
      h="100%"
      PopupWindowLayoutStyle="PopupWindowLayoutStyle"
    >
      <>
        <Search placeholder="البحث عن دواء" w="80%" m="10px" />
     <Table data={items} columns={col} onRowClick={onRowClick} w="95%" />
      </>
    </PopupWindowLayout>
  );
}
