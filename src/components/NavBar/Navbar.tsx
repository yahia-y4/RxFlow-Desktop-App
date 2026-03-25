
import "./NavBar.css"
import { Link } from "react-router-dom";
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function NavBar(){
    return(
        <div className="NavBar">
            <div className="top-icons-div">
                <Link className="top-icon-link" to="/"><PersonalVideoIcon style={{fontSize:25}}/></Link>
                <Link className="top-icon-link" to="/srorage"><ArrowCircleDownIcon style={{fontSize:25}}/></Link>
                <Link className="top-icon-link" to="/sale"><ArrowCircleUpIcon style={{fontSize:25}}/></Link>
         
            </div>
        </div>
    )
}