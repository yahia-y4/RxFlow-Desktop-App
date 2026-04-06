import "./StoragePage.css";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import ItemsList from  "../Sections/ItemsList/ItemsList"
import AddIteme from "../Sections/AddIteme/AddIteme";

export default function StoragePage() {
  return (
    <PageLayout controlButs={<>
         <div className="onControlBut">add</div>
          <div className="onControlBut">add</div>
          <div className="onControlBut">add</div>
          <div className="onControlBut">add</div>
        </>}>
{/* ------ */}


      <ItemsList/>
      <AddIteme/>

{/* ------- */}
    </PageLayout>
  );
}
