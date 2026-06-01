import { URLRoutes } from "../../../routes/URLRoutes";
import { getURL } from "../../account/AccountAPI/GetURL";
import { getToken } from "../../account/AccountAPI/TokenAPI";
import type { Item } from "../types";

export async function searchItems(searchValue: string) {
  try {
    const url = getURL() + URLRoutes.items + "/search";
    if (!url) {
      throw new Error("URL is missing");
    }
    const token = getToken();
    if (!token) {
      throw new Error("Token is missing");
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ searchValue }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `Server error: ${res.status}`);
    }
    return {
      success: true,
      data: data as Item[],
      message: "Search completed successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: [] as Item[],
    };
  }
}
