
import "./loading.css"
import type { RootState } from "../../store/store.ts";
import { useSelector} from "react-redux";

export default function Loading(){
    const isLoading = useSelector((state:RootState)=>state.loading.isLoading)
    if(!isLoading){
        return null
    }
    return(
<div className="loading-div" >
    <div className="loader"></div>
</div>
    )
}