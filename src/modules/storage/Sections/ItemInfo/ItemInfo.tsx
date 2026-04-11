import "./ItemInfo.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import InfoWin from "../../../../components/InfoWin/InfoWin";
import PageControlButsLayout from "../../../../layout/PageControlButsLayout/PageControlButsLayout";
import EditSquareIcon from'@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
export default function ItemInfo() {
  return (
    <PopupWindowLayout
      w="50%"
      h="100%"
      PopupWindowLayoutStyle="ItemInfoPopupWindowLayout"
    >
      <>
        <h3 className="item-title">معلومات الدواء </h3>
        <PageControlButsLayout>
          <div className="onControlBut"><EditSquareIcon style={{fontSize:"30px"}}/></div>
          <div className="onControlBut"><DeleteForeverIcon  style={{fontSize:"30px"}}/></div>
          <div className="onControlBut"><HighlightOffIcon  style={{fontSize:"30px"}}/></div>
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
