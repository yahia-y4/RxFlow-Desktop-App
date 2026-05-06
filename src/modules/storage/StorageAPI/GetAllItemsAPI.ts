import { URLRoutes } from "../../../routes/URLRoutes";
import { getURL } from "../../account/AccountAPI/GetURL";
import { getToken } from "../../account/AccountAPI/TokenAPI";
import type { Item } from "../types";


export async function getAllItems() {
  try {
    const url = getURL() + URLRoutes.items + "/getAll";

    const token = getToken();
    if (!token) {
      throw new Error("Token is missing");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data as Item[],
      message: "Items fetched successfully",
    };

  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: [],
    };
  }
}