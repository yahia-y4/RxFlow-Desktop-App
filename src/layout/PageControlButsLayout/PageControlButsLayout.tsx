

import type { ReactElement } from "react"
import "./PageControlButsLayout.css"

export default function PageControlButsLayout({children}:{children:ReactElement}){
    return(
        <div className="ControlButs-div">
            <div className="ControlButs">{children}</div>
       
        </div>
    )
}