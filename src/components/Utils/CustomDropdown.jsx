import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import styles from "./CustomDropdown.module.css"

// CustomDropdown.jsx
const CustomDropdown = ({ items, selectedValue, onAction, className, label, onSelectionChange }) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className={`${className} text-md min-w-[50px] h-[35px] ${styles['custom-dropdown']}`} //${styles['custom-dropdown']}
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