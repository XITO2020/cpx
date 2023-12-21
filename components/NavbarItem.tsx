import React from 'react';

interface NavbarItemProps {
    label :string;
    className? : string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label,
    className
}) => {
    return (
        <div className={`text-white cursor-pointer hover:text-gray-300 transition ${className}`}>
            {label}
        </div>
    )
}

export default NavbarItem;