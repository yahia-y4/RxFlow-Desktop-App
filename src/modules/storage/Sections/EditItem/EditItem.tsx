import "./EditItem.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/Select/Select";
import Button from "../../../../components/Button/Button";
import { useContext } from "react";
import {StorageContext} from "../../StorageContext" ;
export default function EditItem() {
const {setShowEditItem} = useContext(StorageContext)! ;

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

  return (
    <div className="edit-item-main-div">
      <PopupWindowLayout
        w="25%"
        h="80%"
        PopupWindowLayoutStyle="editItem-PopupWindowLayout"
      >
       


 <div className="EditIteme-form">
        <Input label="الاسم التجاري" w="80%" />
        <Input label=" اسم الشركة" w="80%" />
        <Select options_v={options} label_v="الشكل الصيدلاني" w="80%" />
        <div className="input-select-div" style={{ width: "80%" }}>
          <Input label="التركيز" />
          <Select options_v={options} w="50%" label_v="الواحدة" />
        </div>
        <Select options_v={options} label_v="نوع العبوة" w="80%" />
        <Input label="الكمية" w="80%" />
        <Input label="سعر الشراء $" w="80%" />
        <Input label="نسبة الربح %" w="80%" />
        <Input label="الباركود" w="80%" />
        <Input type="date" label="تاريخ انتهاء الصلاحية" w="80%" />

        <div className="EditIteme-buts">
          <Button label="تعديل" />
          <Button label="محو" />
          <Button onClick={()=>setShowEditItem(false)} label="الغاء" />
        </div>
      </div>


      </PopupWindowLayout>
    </div>
  );
}
