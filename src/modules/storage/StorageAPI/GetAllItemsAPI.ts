
import {URLRoutes} from "../../../routes/URLRoutes";
import {getURL} from "../../account/AccountAPI/GetURL";
import {getToken} from "../../account/AccountAPI/TokenAPI";
import type {Item} from "../types";
let url:string 
try{
 url= getURL() + URLRoutes.items + "/getAll"
} catch (error) {
    console.error("Error constructing URL:", error)
    throw error
}
export async function getAllItems(): Promise<Item[]> {
    const token = getToken()    
    if (!token){
        return []
    } ; 

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch items");
    }

    const data = await response.json();
    return data; 
}
