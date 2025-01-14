import React, { useState } from 'react';

interface Tab {
    id: string;
    label: string;
}

interface SegmentedControlProps {
    tabs: Tab[];
    defaultTab?: string;
    onChange?: (tabId: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
    tabs,
    defaultTab = tabs[0]?.id,
    onChange
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onChange?.(tabId);
    };

    return (
        <div className="inline-flex bg-gray-200 p-1 rounded-lg w-full">
            {
                tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={
                            () => handleTabClick(tab.id)
                        }
                        className={`
                        px-6 py-2 rounded-md text-sm font-medium transition-colors w-full
                        ${activeTab === tab.id
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }
                    `}
                    >
                        {tab.label}
                    </button>
                ))
            }
        </div>
    );
};

export default SegmentedControl;