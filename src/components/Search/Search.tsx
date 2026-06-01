

import "./Search.css"
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Input from "../Input/Input"
type Props = {
    onChange: (value:React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    m?:string; //margin
    w?:string ; // width
    placeholder?: string;
    onSearch: () => void;
    onCancel: () => void;
}
export default function Search({ placeholder, onSearch, onCancel, w, m,value,onChange }: Props) {
    return(
        <div className="Search-div" style={{width:w, margin:m}}>
            <div className="Search-buts">
                <SearchIcon onClick={onSearch} style={{fontSize:"30px"}} />
                <ClearIcon onClick={onCancel} style={{fontSize:"30px"}} />
            </div>
            <Input placeholder={placeholder} value={value} onChange={(e)=>{onChange(e)}}/>
            
        </div>
    )
}