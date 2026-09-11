const Button = ({ 
    children, 
    variant = "primary", 
    onClick,
    className = "", 
    type = "button", 
    disabled = false,
    ...props 
}) => {

    const variants = {
        primary: "bg-blue-700 text-white hover:bg-blue-800",
        secondary: "bg-blue-400 text-blue-800 hover:bg-blue-500",
        outline: "border border-gray-400 text-black hover:bg-gray-100",
        ghost: "text-black bg-blue-100 hover:bg-blue-200",
        transparent: "bg-transparent text-black hover:bg-gray-100",
    };

    const selectedVariant = variants[variant] || variants.primary;

    return (
        <button
        type={type}
            onClick={onClick}
            disabled={disabled}
            {...props}
            className={`rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${selectedVariant} ${className}`.trim()}
        >
            {children}
        </button>
    );
};

export default Button;