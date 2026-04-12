import "./PurchaseInvoice.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Select from "../../../../components/Select/Select";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import InfoWin from "../../../../components/InfoWin/InfoWin";
import PurchaseInvoiceTable from "./PurchaseInvoiceTable/PurchaseInvoiceTable";
export default function PurchaseInvoice() {
  const options = [
    { value: "1", label: "مورد 1" },
    { value: "2", label: "مورد 2" },
    { value: "3", label: "مورد 3" },
  ];
  return (
    <PopupWindowLayout w="50%" h="100%" PopupWindowLayoutStyle="PurchaseInvoice-style">
      <h2 className="PurchaseInvoice-title">فاتورة شراء</h2>
      <Select label_v="المورد" options_v={options} w="70%" />
      <div className="some-PurchaseInvoice-info-div">
        <InfoWin title="عدد الاصناف" data="5"/>
        <InfoWin title="الكمية" data="50"/>
        <InfoWin title="سعر الشراء الكلي" data="30$"/>
      </div>
      <Input label="المبلغ المدفوع" w="40%" />
  
        <PurchaseInvoiceTable/>
      
      <div className="PurchaseInvoice-buts">
        <Button label="حفظ" />
        <Button label="الغاء" />
      </div>
    </PopupWindowLayout>
  );
}
