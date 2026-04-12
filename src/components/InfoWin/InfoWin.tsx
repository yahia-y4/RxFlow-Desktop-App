
import "./InfoWin.css"

type Props = {
    title?:string;
    data?:string;
    w?:string;
    h?:string;
}

export default function InfoWin({title, data, w,h}: Props) {

    return(
        <div className="InfoWin-div" style={{width:w,height:h}} >
            <h4 className="InfoWin-title">{title}</h4>
            <p className="InfoWin-data">( {data} )</p>
        </div>
    )
}