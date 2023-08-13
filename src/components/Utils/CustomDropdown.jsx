import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

// CustomDropdown.jsx
const CustomDropdown = ({ items, selectedValue, onAction, className, label }) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className={`${className} text-md min-w-[50px] h-[35px]`}
                    variant="solid"
                >
                    {label ? label : selectedValue}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Dropdown selection actions"
                value={selectedValue}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedValue}
                onAction={onAction}
                // style={{ backgroundColor: '000' }}
                color="secondary"
                variant="solid"
            >
                {items.map(item => (
                    <DropdownItem key={item.value}>{item.label}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CustomDropdown;