import { DropDownField } from "@/components/ui/form/DropDownField";
import { FormField } from "@/components/ui/form/FormField";

const data = [
  {
    icon: "↓",
    name: "Option 1",
    value: "Option 1",
    isDisabled: false,
  },
  {
    icon: "↓",
    name: "Option 2",
    value: "Option 2",
    isDisabled: false,
  },
  {
    icon: "↓",
    name: "Option 3",
    value: "Option 3",
    isDisabled: false,
  },
];

function App() {
  return (
    <>
      <FormField>
        <DropDownField defaultValue={data[2].value} data={data} />
      </FormField>
    </>
  );
}

export default App;
