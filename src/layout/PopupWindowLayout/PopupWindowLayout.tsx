

import type { ReactNode } from "react"
import "./PopupWindowLayout.css"
export default function PopupWindowLayout({children , w,h}:{children:ReactNode,w?:string,h?:string}){
    return(
        <div className="PopupWindowLayout" style={{width:w,height:h}} >
            {children}
        </div>
    )
}