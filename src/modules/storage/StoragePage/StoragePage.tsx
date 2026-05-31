import "./StoragePage.css";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import ItemsList from "../Sections/ItemsList/ItemsList";
import AddIteme from "../Sections/AddIteme/AddIteme";
import ItemInfo from "../Sections/ItemInfo/ItemInfo";
import EditItem from "../Sections/EditItem/EditItem";
import PurchaseInvoice from "../Sections/PurchaseInvoice/PurchaseInvoice";
import { useState } from "react";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import AssignmentAddIcon from "@mui/icons-material/AssignmentAdd";
import {StorageContext} from "../StorageContext" ;
export default function StoragePage() {
  const [showAddIteme, setShowAddIteme] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showPurchaseInvoice, setShowPurchaseInvoice] = useState(false);
  const [showItemInfo, setShowItemInfo] = useState(false);



  return (
    <PageLayout
      controlButs={
        <>
          <div
            onClick={() => {
              setShowAddIteme(!showAddIteme);
            }}
            className="onControlBut"
          >
            <FormatListBulletedAddIcon style={{ fontSize: "30px" }} />
          </div>
          <div
            onClick={() => {
              setShowPurchaseInvoice(!showPurchaseInvoice);
              setShowItemInfo(false) ;
            }}
            className="onControlBut"
          >
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
        {showPurchaseInvoice && <PurchaseInvoice />}
        {showItemInfo && !showPurchaseInvoice && <ItemInfo />}
        {showEditItem && <EditItem />}
        <ItemsList />
        {showAddIteme && <AddIteme />}

        {/* ------- */}
      </StorageContext.Provider>
    </PageLayout>
  );
}
