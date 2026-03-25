import "./StoragePage.css";
import PageLayout from "../../../layout/PageLayout/PageLayout";


export default function StoragePage() {
  return (
    <PageLayout controlButs={<>
         <div className="onControlBut">add</div>
          <div className="onControlBut">add</div>
          <div className="onControlBut">add</div>
          <div className="onControlBut">add</div>
        </>}>
    </PageLayout>
  );
}
