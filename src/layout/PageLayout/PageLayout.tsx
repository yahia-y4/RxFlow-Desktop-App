

import type { ReactElement } from "react"
import "./PageLayout.css"

export default function PageLayout({title,children}:{title:string,children:ReactElement}){
return(
    <div className="PageLayout">

        <h1 className="PageLayout-title">{title}</h1>
        <div className="PageLayout-content">{children}</div> 
    </div>
)
}