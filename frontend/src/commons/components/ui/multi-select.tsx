import Select from "react-select";
import { GroupBase, Props as SelectProps } from "react-select";

interface Option {
  label: string;
  value: string;
}

type MultiSelectProps<IsMulti extends boolean = false> = SelectProps<
  Option,
  IsMulti,
  GroupBase<Option>
> & {
  isMulti?: IsMulti;
};

export const MultiSelect = <IsMulti extends boolean = false>({
  isMulti,
  ...props
}: MultiSelectProps<IsMulti>) => {
  return (
    <Select
      isMulti={isMulti}
      classNamePrefix="custom-select"
      className="react-select-container w-full"
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: "transparent",
          borderColor: "#193b59",
          borderWidth: "2px",
          boxShadow: state.isFocused ? "0 0 0 1px #5ebfbf" : "none",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          "&:hover": {
            borderColor: "#193b59",
          },
        }),
        menu: (base) => ({
          ...base,
          zIndex: 10,
        }),
      }}
      {...props}
    />
  );
};
