import "./AddIteme.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/Select/Select";
import Button from "../../../../components/Button/Button";
import React, { useContext, useState } from "react";
import { StorageContext } from "../../StorageContext";
import type { ItemForm } from "../../types";
import { AddNewItem } from "../../StorageSlice/AddItemThunk";
import type { AppDispatch } from "../../../../store/store.ts";
import { useDispatch } from "react-redux";


const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const itemInfo: ItemForm = {
  name: "",
  company: "",
  form: "",
  concent: undefined,
  concent_unit: "",
  package_type: "",
  quantity: 1,
  price: 0,
  profit: 0,
  code: "",
  expiry_date:"",
};
export default function AddIteme() {
  const [itemInfoState, setItemInfoState] = useState<ItemForm>(itemInfo);
    const dispatch = useDispatch<AppDispatch>();
  const { setShowAddIteme } = useContext(StorageContext)!;
  async function handleAddItem() {
  
     await dispatch(AddNewItem(itemInfoState))
  }
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItemInfoState({ ...itemInfoState, name: e.target.value });
  }
  function handleCompanyChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItemInfoState((prev) => ({ ...prev, company: e.target.value }));
  }
  function handleFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setItemInfoState((prev) => ({ ...prev, form: e.target.value }));
  }
  function handleConcentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value == "") {
      setItemInfoState({ ...itemInfoState, concent: undefined });
    } else {
      setItemInfoState({ ...itemInfoState, concent: +value });
    }
  }
  function handleConcentUnitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setItemInfoState((prev) => ({ ...prev, concent_unit: e.target.value }));
  }
  function handlePackageTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setItemInfoState((prev) => ({ ...prev, package_type: e.target.value }));
  }
  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value == "") {
      setItemInfoState({ ...itemInfoState, quantity: undefined });
    } else {
      setItemInfoState({ ...itemInfoState, quantity: +value });
    }
  }
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value == "") {
      setItemInfoState({ ...itemInfoState, price: undefined });
    } else {
      setItemInfoState({ ...itemInfoState, price: +value });
    }
  }
  function handleProfitChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value == "") {
      setItemInfoState({ ...itemInfoState, profit: undefined });
    } else {
      setItemInfoState({ ...itemInfoState, profit: +value });
    }
  }
  function handleCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItemInfoState((prev) => ({ ...prev, code: e.target.value }));
  }
  function handleExpiryDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItemInfoState((prev) => ({ ...prev, expiry_date: e.target.value }));
  }
  return (
    <PopupWindowLayout
      w="30%"
      h="100%"
      PopupWindowLayoutStyle="PopupWindowLayoutStyle"
    >
      <div className="AddIteme-form">
        <Input
          onChange={(e) => {
            handleNameChange(e);
          }}
          value={itemInfoState.name}
          label="الاسم التجاري"
          w="80%"
        />
        <Input
          onChange={(e) => {
            handleCompanyChange(e);
          }}
          value={itemInfoState.company}
          label=" اسم الشركة"
          w="80%"
        />
        <Select
          onChange={(e) => {
            handleFormChange(e);
          }}
          value_v={itemInfoState.form}
          options_v={options}
          label_v="الشكل الصيدلاني"
          w="80%"
        />
        <div className="input-select-div" style={{ width: "80%" }}>
          <Input
            type="number"
            onChange={(e) => {
              handleConcentChange(e);
            }}
            value={itemInfoState.concent ?? ""}
            label="التركيز"
          />
          <Select
            onChange={(e) => {
              handleConcentUnitChange(e);
            }}
            options_v={options}
            w="50%"
            label_v="الواحدة"
          />
        </div>
        <Select
          onChange={(e) => {
            handlePackageTypeChange(e);
          }}
          value_v={itemInfoState.package_type}
          options_v={options}
          label_v="نوع العبوة"
          w="80%"
        />
        <Input
          type="number"
          onChange={(e) => {
            handleQuantityChange(e);
          }}
          value={itemInfoState.quantity ?? ""}
          label="الكمية"
          w="80%"
        />
        <Input
          type="number"
          onChange={(e) => {
            handlePriceChange(e);
          }}
          value={itemInfoState.price ?? ""}
          label="سعر الشراء $"
          w="80%"
        />
        <Input
          type="number"
          onChange={(e) => {
            handleProfitChange(e);
          }}
          value={itemInfoState.profit ?? ""}
          label="نسبة الربح %"
          w="80%"
        />
        <Input
          onChange={(e) => {
            handleCodeChange(e);
          }}
          value={itemInfoState.code}
          label="الباركود"
          w="80%"
        />
        <Input
          onChange={(e) => {
            handleExpiryDateChange(e);
          }}
          value={String(itemInfoState.expiry_date)}
          type="date"
          label="تاريخ انتهاء الصلاحية"
          w="80%"
        />

        <div className="AddIteme-buts">
          <Button onClick={handleAddItem} label="اضافة" />
          <Button label="محو" />
          <Button onClick={() => setShowAddIteme(false)} label="الغاء" />
        </div>
      </div>
    </PopupWindowLayout>
  );
}
