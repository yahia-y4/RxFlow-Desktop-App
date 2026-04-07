import "./StoragePage.css";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import ItemsList from  "../Sections/ItemsList/ItemsList"
import AddIteme from "../Sections/AddIteme/AddIteme";
import ItemInfo from "../Sections/ItemInfo/ItemInfo";


import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
export default function StoragePage() {
  return (
    <PageLayout controlButs={<>
         <div className="onControlBut"><FormatListBulletedAddIcon style={{fontSize:"30px"}}/></div>
          <div className="onControlBut"><AssignmentAddIcon style={{fontSize:"30px"}}/></div>
    
        </>}>
{/* ------ */}

      <ItemInfo/>
      <ItemsList/>
      <AddIteme/>

{/* ------- */}
    </PageLayout>
  );
}
