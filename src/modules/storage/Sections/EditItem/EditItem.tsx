import "./EditItem.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/Select/Select";
import Button from "../../../../components/Button/Button";
import type { ItemForm } from "../../types";
import { useContext, useState } from "react";
import { StorageContext } from "../../StorageContext";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../../store/store.ts";
import { setLoading } from "../../../../store/global/loadingSlice.ts";
import { EditItemT } from "../../StorageSlice/EditItemThunk.ts";
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
export default function EditItem() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItemID = useSelector(
    (state: RootState) => state.item.selectedItemID,
  );
  const itemsById = useSelector((state: RootState) => state.item.itemsById);
  const selectedItem = selectedItemID ? itemsById[selectedItemID] : null;
  const { setShowEditItem } = useContext(StorageContext)!;

  const [formData, setFormData] = useState<ItemForm>({
    name: selectedItem?.name ?? "",
    company: selectedItem?.company ?? "",
    form: selectedItem?.form ?? "",
    concent: selectedItem?.concent ?? "",
    concent_unit: selectedItem?.concent_unit ?? "",
    package_type: selectedItem?.package_type ?? "",
    quantity: selectedItem?.quantity ?? 0,
    price: selectedItem?.price ?? 0,
    profit: selectedItem?.profit ?? 0,
    code: selectedItem?.code ?? "",
    expiry_date: selectedItem?.expiry_date ?? "",
  });

  function handleChange(field: keyof ItemForm, value: string) {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function handleEditItem() {
    if (!selectedItemID) return;
    try {
      await dispatch(EditItemT({ id: selectedItemID, itemInfo: formData }));
      setShowEditItem(false);
      dispatch(setLoading(false));
    } catch {
      dispatch(setLoading(false));
      setShowEditItem(false);
    }
  }

  return (
    <div className="edit-item-main-div">
      <PopupWindowLayout
        w="25%"
        h="80%"
        PopupWindowLayoutStyle="editItem-PopupWindowLayout"
      >
        <div className="EditIteme-form">
          <Input
            value={formData?.name ?? ""}
            onChange={(e) => handleChange("name", e.target.value)}
            label="الاسم التجاري"
            w="80%"
          />
          <Input
            value={formData?.company ?? ""}
            onChange={(e) => handleChange("company", e.target.value)}
            label="اسم الشركة"
            w="80%"
          />
          <Select
            options_v={options}
            value_v={formData?.form ?? ""}
            onChange={(e) => handleChange("form", e.target.value)}
            label_v="الشكل الصيدلاني"
            w="80%"
          />
          <div className="input-select-div" style={{ width: "80%" }}>
            <Input
              value={formData?.concent ?? ""}
              onChange={(e) => handleChange("concent", e.target.value)}
              label="التركيز"
            />
            <Select
              options_v={options}
              value_v={formData?.concent_unit ?? ""}
              onChange={(e) => handleChange("concent_unit", e.target.value)}
              w="50%"
              label_v="الواحدة"
            />
          </div>
          <Select
            options_v={options}
            value_v={formData?.package_type ?? ""}
            onChange={(e) => handleChange("package_type", e.target.value)}
            label_v="نوع العبوة"
            w="80%"
          />
          <Input
            value={formData?.quantity ?? ""}
            onChange={(e) => handleChange("quantity", e.target.value)}
            label="الكمية"
            w="80%"
          />
          <Input
            value={formData?.price ?? ""}
            onChange={(e) => handleChange("price", e.target.value)}
            label="سعر الشراء $"
            w="80%"
          />
          <Input
            value={formData?.profit ?? ""}
            onChange={(e) => handleChange("profit", e.target.value)}
            label="نسبة الربح %"
            w="80%"
          />
          <Input
            value={formData?.code ?? ""}
            onChange={(e) => handleChange("code", e.target.value)}
            label="الباركود"
            w="80%"
          />
          <Input
            type="date"
            value={String(formData.expiry_date)}
            onChange={(e) => handleChange("expiry_date", e.target.value)}
            label="تاريخ انتهاء الصلاحية"
            w="80%"
          />

          <div className="EditIteme-buts">
            <Button
              label="تعديل"
              onClick={() => {
                handleEditItem();
              }}
            />
            <Button label="محو" />
            <Button onClick={() => setShowEditItem(false)} label="الغاء" />
          </div>
        </div>
      </PopupWindowLayout>
    </div>
  );
}
