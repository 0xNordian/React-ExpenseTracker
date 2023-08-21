import React, { useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import data from "./data";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const columns = data.columns;

export default function TableView({ deleteExp, tableExpData, filterByCategory }) {
    const renderCell = useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "title":
                return cellValue;
            case "date":
                // Format the date using toLocaleDateString()
                return new Date(cellValue).toLocaleDateString();
            case "displayCategory":
                return (
                    // <Chip
                    //     className="bg-white text-sm scale-[85%] max-w-[100px] overflow-hidden truncate cursor-pointer hover:bg-[#283f3b] hover:text-[#99ddc8] transform hover:scale-90 transition-transform duration-300 hover:shadow-md"
                    //     color="success"
                    //     variant="dot"
                    //     data-tip={cellValue}
                    //     onClick={() => filterByCategory(cellValue)}
                    // >
                    //     {cellValue}
                    // </Chip>
                    // <Tooltip classNames={{base: "bg-[#99ddc8] none"}}>
                    <Tooltip content={cellValue.length > 10 ? cellValue : ""} classNames={{ base: cellValue.length > 10 ? "bg-gray-200" : "hidden" }}>
                        <Chip
                            className="bg-white text-sm scale-[85%] min-w-[100px] max-w-[120px] overflow-hidden truncate cursor-pointer hover:bg-[#283f3b] hover:text-[#99ddc8] transform hover:scale-90 transition-transform duration-300 hover:shadow-md"
                            color="success"
                            variant="dot"
                            // title={cellValue}
                            onClick={() => filterByCategory(cellValue)}
                        >
                            {cellValue.length > 10
                                ? `${cellValue.slice(0, 10)}...`
                                : cellValue}
                        </Chip>
                    </Tooltip>

                );
            case "amount":
                return cellValue;
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        {/* <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip> */}
                        {/* <Tooltip content="Edit title">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleTitleInputChange(item.id)}> 
                        
                                <EditIcon />
                            </span>
                        </Tooltip> */}
                        <Tooltip color="danger" content="Delete">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => deleteExp(item.id)}>
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="text-center">
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={tableExpData}>
                {(item, index) => (
                    <TableRow key={item.id} className={`bg-[#99ddc8] text-[#283F3B] ${index % 2 === 0 ? "even:bg-[#99ddc8] even:text-[#283F3B]" : "odd:bg-white odd:text-black"}`}>
                        {(columnKey) => <TableCell className={`${columnKey === "title" ? "font-bold" : "text-center"}`}>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
