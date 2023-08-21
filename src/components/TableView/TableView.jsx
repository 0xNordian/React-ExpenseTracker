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
                    <Chip
                        className="text-sm scale-[85%] cursor-pointer hover:bg-[#283f3b] hover:text-[#99ddc8] transform hover:scale-90 transition-transform duration-300 hover:shadow-md"
                        color="success"
                        variant="dot"
                        onClick={() => filterByCategory(cellValue)}
                    >
                        {cellValue}
                    </Chip>
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
                        <Tooltip color="danger" content="Delete user">
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
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell className={columnKey === "title" ? "" : "text-center"}>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
