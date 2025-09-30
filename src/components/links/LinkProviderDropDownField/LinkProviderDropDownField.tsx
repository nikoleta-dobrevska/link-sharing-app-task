import { DropDownField } from "@/components/ui/form/DropDownField";
import { type LinkProviderData } from "@/types";

type DropDownFieldProps = {
  dropDownFieldId: string;
  placeholder: React.ReactNode;
  onChange: (option: LinkProviderData) => void;
  options: LinkProviderData[];
  selected?: LinkProviderData | null;
};

export const LinkProviderDropDownField = ({
  dropDownFieldId,
  placeholder,
  onChange,
  options,
  selected,
}: DropDownFieldProps) => {
  return (
    <DropDownField
      dropDownFieldId={dropDownFieldId}
      placeholder={placeholder}
      onChange={(selected) => onChange(selected as LinkProviderData)}
      options={options}
      selected={selected}
    />
  );
};
