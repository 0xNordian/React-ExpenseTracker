import React from "react";
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

export default function TableView({ tableExpData }) {
    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "title":
                return cellValue;
                case "date":
                    // Format the date using toLocaleDateString()
                    return new Date(cellValue).toLocaleDateString();
            case "displayCategory":
                return cellValue;
            case "amount":
                return cellValue;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={tableExpData}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
