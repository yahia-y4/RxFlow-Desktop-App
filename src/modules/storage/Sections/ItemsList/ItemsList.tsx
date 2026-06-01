import "./ItemsList.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Table from "../../../../components/Table/Table";
import Search from "../../../../components/Search/Search";
import type { Item, columnType } from "../../types";
import { useContext, useEffect, useState } from "react";
import { StorageContext } from "../../StorageContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../StorageSlice/FetchItemsThunk.ts";
import { selectIDitem } from "../../StorageSlice/ItemSlice";
import type { RootState, AppDispatch } from "../../../../store/store.ts";
import { formatDate } from "../../../../utils/formatDate.ts";
import { searchItems } from "../../StorageAPI/SearchItemAPI.ts";
import { setLoading } from "../../../../store/global/loadingSlice.ts";

export default function ItemsList() {
  const items = useSelector((state: RootState) => state.item.itemsArray);
  const dispatch = useDispatch<AppDispatch>();
  const { setShowItemInfo, showPurchaseInvoice } = useContext(StorageContext)!;
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch, items.length]);

  const col: columnType<Item>[] = [
    { label: "الاسم", key: "name" },
    { label: "الشركة", key: "company" },
    { label: "الشكل", key: "form" },
    {
      label: "التركيز",
      key: "concent",
      render: (value, item) => (value ? `${value}  ${item.concent_unit}` : ""),
    },
    {
      label: "سعر البيع",
      key: "sell_price",
      render: (_, item) => +item.price + +item.price * item.profit,
    },
    { label: " الكمية", key: "quantity" },
    {
      label: "تاريخ الانتهاء",
      key: "expiry_date",
      render: (value) => formatDate(String(value ?? "")),
    },
  ];

  async function onRowClick(item: Item) {
    if (!showPurchaseInvoice) {
      dispatch(selectIDitem({ id: item.id }));
      setShowItemInfo(true);
    }
  }

  async function SearchFun() {
    const result = await searchItems(searchValue);
    try {
      dispatch(setLoading(true));
      if (result.success) {
        setSearchResults(result.data);
      } else {
        console.log("Search failed:", result.message);
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
  function CancelSearchFun() {
    setSearchValue("");
    setSearchResults([]);
  }

  function onSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <PopupWindowLayout
      w="95%"
      h="100%"
      PopupWindowLayoutStyle="PopupWindowLayoutStyle"
    >
      <>
        <Search
          placeholder=" البحث "
          w="80%"
          m="10px"
          onSearch={SearchFun}
          onCancel={CancelSearchFun}
          value={searchValue}
          onChange={(e) => onSearchValueChange(e)}
        />
        <Table
          data={searchResults.length > 0 ? searchResults : items}
          columns={col}
          onRowClick={onRowClick}
          w="95%"
        />
      </>
    </PopupWindowLayout>
  );
}
