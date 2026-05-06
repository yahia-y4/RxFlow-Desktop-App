

import "./ErrorWin.css"
import Button from "../Button/Button"
import PopupWindowLayout from "../../layout/PopupWindowLayout/PopupWindowLayout"
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store.ts";
import { clearError } from "../../store/global/errorSlice.ts";
export default function ErrorWin() {
const error = useSelector((state: RootState) => state.error.message);
const dispatch = useDispatch();
    if(!error) return null
    return (
        <div className="error-win">
            <PopupWindowLayout w="30%" h="25%" PopupWindowLayoutStyle="error-popup" >
            <div className="error-text"><p>{error}</p></div>
            <Button onClick={()=>dispatch(clearError())} label="Close" w="60%" />
            </PopupWindowLayout>
            
        </div>
    )
}