import { URLRoutes } from "../../../routes/URLRoutes";
import { getURL } from "../../account/AccountAPI/GetURL";
import { getToken } from "../../account/AccountAPI/TokenAPI";
import type { Item} from "../types";


export async function deleteItem(itemID: string | undefined) {
    try {
        const url = getURL() + URLRoutes.items + `/delete/${itemID}`;
        console.log("Delete item URL:", url);
        if (!url) {
            throw new Error("URL is missing");
        }
        const token = getToken();
        if (!token) {
            throw new Error("Token is missing");
        }
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data.error || `Server error: ${response.status}`);
        }

        return {
            success: true,
            message: data.message || "Item deleted successfully",
            data: data as Item,
        };
    } catch (error) {        console.error("Error deleting item:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error",
            data: {} as Item,
        };

    }
}