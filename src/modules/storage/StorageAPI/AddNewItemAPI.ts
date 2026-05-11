import { URLRoutes } from "../../../routes/URLRoutes";
import { getURL } from "../../account/AccountAPI/GetURL";
import { getToken } from "../../account/AccountAPI/TokenAPI";
import type { ItemForm , Item} from "../types";


export async function addNewItem(itemInfo: ItemForm) {
  try {
    const url = getURL() + URLRoutes.items + "/add";
    console.log("Add item URL:", url);
    if (!url) {
      throw new Error("URL is missing");
    }
    const token = getToken();
    if (!token) {
      throw new Error("Token is missing");
    }
    if (
      !itemInfo.name ||
      !itemInfo.company ||
      !itemInfo.form ||
      !itemInfo.concent_unit ||
      !itemInfo.package_type ||
      !itemInfo.expiry_date
    ) {
      throw new Error("Please fill in all required fields");
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(itemInfo),
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error(data.error || `Server error:${response.status}` );
    }

    return {
      success: true,
      message: data.message || "Item added successfully",
      data: data.data as Item,
    };
  } catch (error) {
    console.error("Error adding item:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: {} as Item,
    };
  }
}
