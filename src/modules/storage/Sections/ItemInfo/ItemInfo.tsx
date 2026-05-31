import "./ItemInfo.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import InfoWin from "../../../../components/InfoWin/InfoWin";
import PageControlButsLayout from "../../../../layout/PageControlButsLayout/PageControlButsLayout";
import EditSquareIcon from'@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import type { RootState,AppDispatch} from "../../../../store/store.ts";
import { useSelector , useDispatch } from "react-redux";
import { showWarning } from "../../../../store/global/WarningSlice.ts";
import { DeleteItem } from "../../StorageSlice/DeleteItemThunk.ts";
import { useContext } from "react";
import {StorageContext}from "../../StorageContext";
import { formatDate } from "../../../../utils/formatDate.ts";
export default function ItemInfo() {
  const selectedItemID = useSelector((state: RootState) => state.item.selectedItemID);
  const itemsById = useSelector((state: RootState) => state.item.itemsById);
  const dispatch = useDispatch<AppDispatch>();
  const selectedItem = selectedItemID ? itemsById[selectedItemID] : null;
 
  const {setShowItemInfo,setShowEditItem} = useContext(StorageContext)! ;
if (!selectedItem) {
  return null
}

async function handleDeleteItem() {
  if (!selectedItem) return;
  dispatch(showWarning({
    message: "هل انت متأكد من حذف هذا العنصر؟",
    toExecute: () => dispatch(DeleteItem(selectedItem.id)),}));

}
  return (
    <PopupWindowLayout
      w="50%"
      h="100%"
      PopupWindowLayoutStyle="ItemInfoPopupWindowLayout"
    >
      <>
        <h3 className="item-title">معلومات الدواء </h3>
        <PageControlButsLayout>
          <div className="onControlBut" onClick={()=>setShowEditItem(true)}><EditSquareIcon style={{fontSize:"30px"}}/></div>
          <div className="onControlBut"  onClick={()=>handleDeleteItem()}><DeleteForeverIcon  style={{fontSize:"30px"}}/></div>
          <div className="onControlBut"  onClick={()=>{setShowItemInfo(false)}}><HighlightOffIcon  style={{fontSize:"30px"}}/></div>
        </PageControlButsLayout>
        <div className="item-info-wins-div">
          <InfoWin title="ID" data={selectedItem.id} />
          <InfoWin title={selectedItem.name} data={selectedItem.company} />
          <InfoWin title="الشكل" data={selectedItem.form}/>
          <InfoWin title="الكمية" data={String(selectedItem.quantity)} />
          <InfoWin title="سعر الشراء" data={String(selectedItem.price) + "$"} />
          <InfoWin title="سعر البيع" data={String(selectedItem.sell_price) + "$"} />
          <InfoWin title="نسبة الربح" data={String(selectedItem.profit * 100) + "%"}  />
          <InfoWin title="التركيز" data= {selectedItem.concent} />
          <InfoWin title="الباركود" data={selectedItem.code} />
          <InfoWin title="تاريخ الانتهاء" data={formatDate(String(selectedItem.expiry_date))} />
        </div>
      </>
    </PopupWindowLayout>
  );
}
