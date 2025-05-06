import Select from "react-select";
import { GroupBase, Props as SelectProps } from "react-select";

interface Option {
  label: string;
  value: string;
}

type MultiSelectProps = SelectProps<Option, true, GroupBase<Option>>;

export const MultiSelect = ({ ...props }: MultiSelectProps) => {
  return (
    <Select
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
