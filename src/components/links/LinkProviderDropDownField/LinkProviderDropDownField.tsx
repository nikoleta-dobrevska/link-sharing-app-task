import {
  DropDownField,
  type Option,
} from "@/components/ui/form/DropDownField/DropDownField";
import { type LinkProviderData } from "@/types";

function mapLinkProviderToOption(linkProvider: LinkProviderData): Option {
  return {
    name: linkProvider.name,
    src: linkProvider.iconSrc,
  };
}

type LinkProviderDropDownFieldProps = {
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
}: LinkProviderDropDownFieldProps) => {
  return (
    <DropDownField
      dropDownFieldId={dropDownFieldId}
      placeholder={placeholder}
      options={options.map((option) => mapLinkProviderToOption(option))}
      selected={selected ? mapLinkProviderToOption(selected) : undefined}
      onChange={(option) => {
        const selected = options.find((sel) => option.name === sel.name);

        if (selected) {
          onChange(selected);
        }
      }}
    />
  );
};
