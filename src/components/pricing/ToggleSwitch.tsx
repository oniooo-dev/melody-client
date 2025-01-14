import React, { useState } from 'react';

interface ToggleOption {
    label: string;
    value: string;
}

interface ToggleSwitchProps {
    options: [ToggleOption, ToggleOption];
    defaultValue?: string;
    onChange?: (value: string) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    options,
    defaultValue = options[0].value,
    onChange
}) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleClick = (value: string) => {
        setSelectedValue(value);
        onChange?.(value);
    };

    return (
        <div
            className="
                relative inline-flex 
                rounded-xl border-2 border-white border-opacity-70 
                bg-gray-800/30 backdrop-blur-sm
            "
        >
            {
                options.map(
                    (option, index) => (
                        <button
                            key={option.value}
                            onClick={
                                () => handleClick(option.value)
                            }
                            className={`
                                    relative px-6 py-2 text-sm font-medium transition-all duration-200
                                    ${selectedValue === option.value
                                    ? 'text-white'
                                    : 'text-white text-opacity-30 hover:text-white hover:text-opacity-100'
                                }
                            `}
                        >
                            {option.label}
                            {
                                selectedValue === option.value && (
                                    <span
                                        className="
                                            absolute inset-0 
                                            rounded-lg
                                            bg-white bg-opacity-30
                                        "
                                        style={{
                                            zIndex: -1
                                        }}
                                    />
                                )
                            }
                        </button>
                    )
                )
            }
        </div >
    );
};

export default ToggleSwitch