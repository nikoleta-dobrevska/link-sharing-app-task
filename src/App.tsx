import Icon from "@/assets/svgr/GitHub.svg?react";
import { DropDownField } from "@/components/ui/form/DropDownField";
import { FormField } from "@/components/ui/form/FormField";
import { Navbar } from "@/components/ui/nav/Navbar";

const data = [
  {
    icon: <Icon />,
    name: "Option 1",
    value: "Option 1",
  },
  {
    icon: <Icon />,
    name: "Option 2",
    value: "Option 2",
  },
  {
    icon: <Icon />,
    name: "Option 3",
    value: "Option 3",
  },
];

function App() {
  return (
    <>
      <div style={{ width: "50%" }}>
        <FormField>
          <DropDownField placeholder="Example" options={data} />
        </FormField>
      </div>
      <div>
        <Navbar activePageIndex={1} />
      </div>
    </>
  );
}

export default App;
