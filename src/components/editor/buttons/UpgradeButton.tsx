import React from 'react'

interface UpgradeButtonProps {
    onUpgrade: () => void;
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({ onUpgrade }) => {
    return (
        <button onClick={onUpgrade}>
            Upgrade
        </button>
    )
}

export default UpgradeButton