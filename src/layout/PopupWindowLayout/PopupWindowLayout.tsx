

import type { ReactNode } from "react"
import "./PopupWindowLayout.css"
export default function PopupWindowLayout({children ,w,h ,PopupWindowLayoutStyle }:{children:ReactNode,w?:string,h?:string,PopupWindowLayoutStyle?:string}) {
    return(
        <div className={"PopupWindowLayout" + (PopupWindowLayoutStyle ? ` ${PopupWindowLayoutStyle}` : '')} style={{width:w,height:h} }  >
            {children}
        </div>
    )
}