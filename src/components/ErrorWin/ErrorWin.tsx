

import "./ErrorWin.css"
import Button from "../Button/Button"
import PopupWindowLayout from "../../layout/PopupWindowLayout/PopupWindowLayout"
import { useContext } from "react"
import { ErrorContext } from "../../generalContext/ErrorContext/ErrorContext"
export default function ErrorWin() {
    const {error,setVisibleError,visibleError} = useContext(ErrorContext)!
    if(!visibleError) return null
    return (
        <div className="error-win">
            <PopupWindowLayout w="30%" h="25%" PopupWindowLayoutStyle="error-popup" >
            <div className="error-text"><p>{error}</p></div>
            <Button onClick={()=>setVisibleError(false)} label="Close" w="60%" />
            </PopupWindowLayout>
            
        </div>
    )
}