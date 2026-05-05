import "./ItemInfo.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import InfoWin from "../../../../components/InfoWin/InfoWin";
import PageControlButsLayout from "../../../../layout/PageControlButsLayout/PageControlButsLayout";
import EditSquareIcon from'@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import type { RootState} from "../../../../store/store.ts";
import { useSelector } from "react-redux";

import { useContext } from "react";
import {StorageContext}from "../../StorageContext";
export default function ItemInfo() {
  const selectedItemID = useSelector((state: RootState) => state.item.selectedItemID);
  const itemsById = useSelector((state: RootState) => state.item.itemsById);
  const selectedItem = selectedItemID ? itemsById[selectedItemID] : null;
  console.log("selected item id in ItemInfo:", selectedItemID);
  console.log("selected item in ItemInfo:", selectedItem);
  const {setShowItemInfo,setShowEditItem} = useContext(StorageContext)! ;

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
          <div className="onControlBut"><DeleteForeverIcon  style={{fontSize:"30px"}}/></div>
          <div className="onControlBut"  onClick={()=>{setShowItemInfo(false)}}><HighlightOffIcon  style={{fontSize:"30px"}}/></div>
        </PageControlButsLayout>
        <div className="item-info-wins-div">
          <InfoWin title="ID" data="28" />
          <InfoWin title="باراسيتامول" data="الفا" />
          <InfoWin title="الشكل" data="شراب" />
          <InfoWin title="الكمية" data="30" />
          <InfoWin title="سعر البيع" data="1.5" />
          <InfoWin title="سعر الشراء" data="1" />
          <InfoWin title="نسبة الربح" data="50%" />
          <InfoWin title="التركيز" data="200 mg" />
          <InfoWin title="الباركود" data="653747267524" />
          <InfoWin title="تاريخ الانتهاء" data="2028/1/1" />
        </div>
      </>
    </PopupWindowLayout>
  );
}
