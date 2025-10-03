import { useMemo } from "react";

import { DropDownField } from "@/components/ui/form/DropDownField";
import { type LinkProviderData } from "@/types";

type Option = {
  name: string;
  src: string;
};

function mapLinkProviderToOption(linkProvider: LinkProviderData): Option {
  return {
    name: linkProvider.name,
    src: linkProvider.iconSrc,
  };
}

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
      options={useMemo(() => {
        const mappedOptions = options.map((option) =>
          mapLinkProviderToOption(option)
        );

        return mappedOptions;
      }, [options])}
      selected={useMemo(() => {
        return selected ? mapLinkProviderToOption(selected) : undefined;
      }, [selected])}
      onChange={(option) => {
        const selected = options.find((sel) => option.name === sel.name);

        if (selected) {
          onChange(selected);
        }
      }}
    />
  );
};
