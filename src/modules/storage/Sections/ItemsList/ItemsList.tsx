import "./ItemsList.css";
import PopupWindowLayout from "../../../../layout/PopupWindowLayout/PopupWindowLayout";
import Table from "../../../../components/Table/Table";
export default function ItemsList() {
  const data = [
    { name: "yahia", age: 21 },
    { name: "yahia", age: 21 },
    { name: "yahia", age: 21 },
  ];
  const col = [
    {label:"الاسم",
      key:"name"
    },
    {label:"العمر",
      key:"age"
    }
  ]
  return (
    <PopupWindowLayout w="95%" h="100%">
      <>
        <Table data={data} columns={col} />
      </>
    </PopupWindowLayout>
  );
}
