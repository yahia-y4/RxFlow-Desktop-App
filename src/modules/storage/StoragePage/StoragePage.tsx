import "./StoragePage.css";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import ItemsList from  "../Sections/ItemsList/ItemsList"

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

{/* ------- */}
    </PageLayout>
  );
}
