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

export default function ItemsList() {
  const items = useSelector((state: RootState) => state.item);
  console.log("Items from Redux store:", items);
  const dispatch = useDispatch<AppDispatch>();

  const { setShowItemInfo, showPurchaseInvoice } = useContext(StorageContext)!;

  useEffect(() => {
    dispatch(fetchItems());
  },[dispatch]);

  const data: Item[] = [
    {
      id: "1",
      name: "دواء 1",
      company: "شركة 1",
      form: "شكل 1",
      concent: 10,
      concent_unit: "mg/ml",
      package_type: "شكل",
      quantity: 12,
      price: 12,
      profit: 1,
      sell_price: 15,
      code: "123456",
      expiry_date: "2024-12-31",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ];
  const col: columnType<Item>[] = [
    { label: "الاسم", key: "name" },
    { label: "الشركة", key: "company" },
    { label: "الشكل", key: "form" },
    { label: "التركيز", key: "concent" },
    { label: "سعر البيع", key: "sell_price" },
    { label: " الكمية", key: "quantity" },
    { label: "تاريخ الانتهاء", key: "expiry_date" },
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
     <Table data={data} columns={col} onRowClick={onRowClick} w="95%" />
      </>
    </PopupWindowLayout>
  );
}
