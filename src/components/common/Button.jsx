const Button = ({ children, variant = "primary" }) => {

    const variants = {
        primary: "bg-blue-700 text-white hover:bg-blue-800",
        secondary: "bg-blue-400 text-blue-800 hover:bg-blue-500",
        outline: "border border-gray-400 text-black hover:bg-gray-100",
        ghost: "text-black bg-blue-100 hover:bg-blue-200",
        transparent: "bg-transparent text-black hover:bg-gray-100",
    };

    return (
        <button
            className={`rounded-lg transition-all duration-300 px-4 py-2 cursor-pointer text-sm font-semibold ${variants[variant]}`}
        >
            {children}
        </button>
    );
};

export default Button;