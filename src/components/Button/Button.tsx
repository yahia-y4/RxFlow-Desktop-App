 
 import "./Button.css"

type Props = {
    onClick?: () => void;
    label?: string;
    w?:string;
};

 export default function Button({onClick, label, w}: Props) {
    return(
        <button  className="Button" style={{width:w}}   onClick={onClick}>{label} </button>
    )
 }