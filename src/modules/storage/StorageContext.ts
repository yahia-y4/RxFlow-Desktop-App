import { createContext } from "react";

type StorageContextType = {
  showAddIteme: boolean;
  setShowAddIteme: React.Dispatch<React.SetStateAction<boolean>>;
  showEditItem: boolean;
  setShowEditItem: React.Dispatch<React.SetStateAction<boolean>>;
  showPurchaseInvoice: boolean;
  setShowPurchaseInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  showItemInfo: boolean;
  setShowItemInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StorageContext = createContext<StorageContextType | null>(null);