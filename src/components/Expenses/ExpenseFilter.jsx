
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const ExpenseFilter = (props) => {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["All"]));
    const [isOpen, setIsOpen] = React.useState(false);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const filterYearHandler = (selectedYear) => {
        console.log("Selected year:", selectedYear);
        props.onFilterExpense(selectedYear);
    }

    return (
        <Dropdown>
            <DropdownTrigger>
            {/* <Tooltip content="Filter year"> */}
                    <Button
                        className="capitalize text-[#99ddc8] bg-[#283f3b] hover:bg-[#659b5e] hover:text-[#283f3b]"
                        // color="secondary"
                        variant="solid"
                    >
                        {selectedValue}
                    </Button>
            {/* </Tooltip> */}
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection actions"
                // variant="flat"
                value="2023"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                onAction={(key) => filterYearHandler(key)}
                color="secondary"
                variant="solid"
                >
                <DropdownItem key="All">All</DropdownItem>
                <DropdownItem key="2023">2023</DropdownItem>
                <DropdownItem key="2022">2022</DropdownItem>
                <DropdownItem key="2021">2021</DropdownItem>
                <DropdownItem key="2020">2020</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default ExpenseFilter;