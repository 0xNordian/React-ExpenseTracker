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
                // color="secondary"
                itemClasses={{
                    base: [
                        "rounded-md",
                        "text-gray-500",
                        // "hover:bg-pink-500",
                        "transition-opacity",
                        "data-[hover=true]:text-[#283f3b]",
                        "data-[hover=true]:bg-[#99ddc8]",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                }}
                variant="solid"
                className="max-h-[157px] overflow-y-auto"
            >
                {items.map(item => (
                    <DropdownItem key={item.value}>{item.label}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CustomDropdown;