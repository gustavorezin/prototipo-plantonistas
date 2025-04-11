interface ToggleProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export const Toggle = ({ options, selected, onChange }: ToggleProps) => {
  return (
    <div className="flex justify-center gap-2 bg-gray-200 p-1 rounded-lg">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          className={`px-4 py-2 rounded-md transition-all ${
            selected === option.value
              ? "bg-secondary text-white"
              : "bg-transparent text-gray-700"
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
