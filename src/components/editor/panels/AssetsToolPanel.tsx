import React from 'react'
import SegmentedControl from '../misc/SegmentedControl'
import SearchBox from '../misc/SearchBox';

interface AssetType {
    id: string;
    label: string;
}

const tabs: AssetType[] = [
    { id: 'image', label: 'Image' },
    { id: 'video', label: 'Video' },
    { id: 'music', label: 'Music' },
];

const AssetsToolPanel = () => {

    // Handle tab change
    const handleChange = (tabId: string) => {
        console.log('Selected tab:', tabId);
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <SegmentedControl
                tabs={tabs}
                onChange={handleChange}
            />
            <SearchBox />
        </div>
    );
}

export default AssetsToolPanel