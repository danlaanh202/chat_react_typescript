const Button = ({
  children,
  className,
  type,
  isLoading,
  disabled,
}: {
  className?: string;
  children: any;
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-primary-color disabled:bg-secondary-color disabled:cursor-not-allowed flex items-center justify-center min-h-[56px] text-white font-semibold rounded-lg  ${className}`}
    >
      {isLoading ? (
        <span className="block w-6 h-6 border-2 border-white rounded-full border-l-transparent animate-spin"></span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
