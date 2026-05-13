import "./WarningWin.css";
import PopupWindowLayout from "../../layout/PopupWindowLayout/PopupWindowLayout";
import Button from "../Button/Button";
import { useSelector,useDispatch } from "react-redux";
import type { RootState,AppDispatch } from "../../store/store";
import { hideWarning } from "../../store/global/WarningSlice";
export default function WarningWin() {
    const warningState = useSelector((state: RootState) => state.warning);
    const dispatch = useDispatch<AppDispatch>();
    if (!warningState.isVisible) {
        return null;
    }
  return (
    <div className="WarningWin-div">
      <PopupWindowLayout
        w="400px"
        h="200px"
        PopupWindowLayoutStyle="WarningWin-style"
      >
        <div className="WarningWin-text">هل انت متأكد من اجراء هذه العملية</div>
        <div className="WarningWin-buts">
          <Button onClick={warningState.toExecute} label="موافق" />
          <Button onClick={()=>dispatch(hideWarning())} label="الغاء" />
        </div>
      </PopupWindowLayout>
    </div>
  );
}
