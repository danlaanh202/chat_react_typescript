import { Control, useController } from "react-hook-form";

const Input = ({
  className,
  placeholder,
  control,
  name,
  type = "text",
  id,
  error,
}: {
  className?: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  name: string;
  id: string;
  error?: string;
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        className={`w-full py-4 px-4 rounded-lg border-2 dark:bg-transparent ${
          !!error ? "border-red-500" : ""
        }`}
        {...field}
      />
      <span className="h-4 text-xs text-red-500">{error ? error : " "}</span>
    </div>
  );
};

export default Input;
