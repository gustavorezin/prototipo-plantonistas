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
  label?: string;
  id: string;
};

export const MultiSelect = <IsMulti extends boolean = false>({
  isMulti,
  label,
  id,
  ...props
}: MultiSelectProps<IsMulti>) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Select
        id={id}
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
    </div>
  );
};
