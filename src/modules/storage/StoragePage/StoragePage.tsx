import "./StoragePage.css";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import ItemsList from "../Sections/ItemsList/ItemsList";
import AddIteme from "../Sections/AddIteme/AddIteme";
import ItemInfo from "../Sections/ItemInfo/ItemInfo";
import EditItem from "../Sections/EditItem/EditItem";
import PurchaseInvoice from "../Sections/PurchaseInvoice/PurchaseInvoice";
import { useState, createContext } from "react";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import AssignmentAddIcon from "@mui/icons-material/AssignmentAdd";
export const StorageContext = createContext({});
export default function StoragePage() {
  const [showAddIteme, setShowAddIteme] = useState<boolean>(false);
  const [showEditItem, setShowEditItem] = useState<boolean>(false);
  const [showPurchaseInvoice, setShowPurchaseInvoice] =
    useState<boolean>(false);
  const [showItemInfo, setShowItemInfo] = useState<boolean>(false);

  

  return (
    <PageLayout
      controlButs={
        <>
          <div className="onControlBut">
            <FormatListBulletedAddIcon style={{ fontSize: "30px" }} />
          </div>
          <div className="onControlBut">
            <AssignmentAddIcon style={{ fontSize: "30px" }} />
          </div>
        </>
      }
    >
      <StorageContext.Provider
        value={{
          showAddIteme,
          setShowAddIteme,
          showEditItem,
          setShowEditItem,
          showPurchaseInvoice,
          setShowPurchaseInvoice,
          showItemInfo,
          setShowItemInfo,
        }}
      >
        {/* ------ */}
        <PurchaseInvoice />
        <ItemInfo />
        <ItemsList />
        <AddIteme />
        <EditItem />
        {/* ------- */}
      </StorageContext.Provider>
    </PageLayout>
  );
}
