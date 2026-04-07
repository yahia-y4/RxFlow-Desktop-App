

import type { ReactNode } from "react"
import "./PageControlButsLayout.css"

export default function PageControlButsLayout({children}:{children:ReactNode}){
    return(
        <div className="ControlButs-div">
            {children}
       
        </div>
    )
}