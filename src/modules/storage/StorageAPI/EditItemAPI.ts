import { URLRoutes } from "../../../routes/URLRoutes";
import { getURL } from "../../account/AccountAPI/GetURL";
import { getToken } from "../../account/AccountAPI/TokenAPI";
import type { ItemForm , Item} from "../types";

export async function editItem(itemID: string | number, itemInfo: ItemForm) {
    try {
        if(!itemID ||
         !itemInfo.code
        || !itemInfo.name ||
        !itemInfo.company ||
        !itemInfo.form ||
        !itemInfo.concent_unit ||
        !itemInfo.package_type ||
        !itemInfo.expiry_date
        ){
            throw new Error("Please fill in all required fields");
        }

        const url = getURL() + URLRoutes.items + `/update/${itemID}`;
        console.log("Edit item URL:", url);
        if (!url) {
            throw new Error("URL is missing");
        }
        const token = getToken();
        if (!token) {
            throw new Error("Token is missing");
        }
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(itemInfo),
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `Server error: ${response.status}`);
        }
        return{
            success: true,
            message: data.message || "Item edited successfully",
            data: data as Item,
        }
    }catch (error) {
        console.error("Error editing item:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error",
            data: {} as Item,
        };
    }
}