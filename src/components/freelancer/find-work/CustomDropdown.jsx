import { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiChevronDown } from "react-icons/fi";

const CustomDropdown = ({ value, onChange, options, className = "" }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption =
        options.find((option) => option.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        onChange(option.value);
        setOpen(false);
    };

    return (
        <div
            ref={dropdownRef}
            className={`relative w-full ${className}`}
        >
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    flex w-full items-center justify-between
                    rounded-xl
                    border
                    bg-slate-50
                    px-4 py-3
                    text-sm font-medium
                    outline-none
                    cursor-pointer
                    transition-all duration-200
                    ${open
                        ? "border-indigo-500 bg-white ring-4 ring-indigo-500/10"
                        : "border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-white"
                    }
                `}
            >
                <span>{selectedOption?.label}</span>

                <FiChevronDown
                    className={`
                        h-4 w-4
                        text-slate-400
                        transition-transform duration-200
                        ${open ? "rotate-180 text-indigo-500" : ""}
                    `}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        absolute left-0 right-0 top-[calc(100%+8px)]
                        z-50
                        overflow-hidden
                        rounded-xl
                        border border-slate-100
                        bg-white
                        p-1.5
                        shadow-xl shadow-slate-200/50
                    "
                >
                    {options.map((option) => {
                        const isSelected = option.value === value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`
                                    flex w-full items-center justify-between
                                    rounded-lg
                                    px-3 py-2.5
                                    text-left text-sm
                                    transition-all duration-150
                                    ${isSelected
                                        ? "bg-indigo-50 font-semibold text-indigo-600"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                                    }
                                `}
                            >
                                <span>{option.label}</span>

                                {isSelected && (
                                    <FiCheckCircle className="h-4 w-4 text-indigo-500" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;