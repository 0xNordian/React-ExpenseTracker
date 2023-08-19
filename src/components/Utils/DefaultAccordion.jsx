import React, { useContext } from "react";
import styles from "./DefaultAccordion.module.css"
import ExpenseContext from "../Context/ExpenseContext";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

export function DefaultAccordion(props) {
    const [open, setOpen] = React.useState(0);
    const { selectedYear, selectedCategory } = useContext(ExpenseContext);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const filterStatus = selectedYear === "All" && selectedCategory === "All" ?  "filterOff" : "filterOn";

    return (
        <>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />} className="w-[100%]">
                <div className="w-full flex justify-end">
                    <div className="w-full flex justify-start">
                        <span className={`${styles['circle']} ${styles[filterStatus]}`}></span>
                        <AccordionHeader onClick={() => handleOpen(1)} className={`filter invert mx-2 border-b-slate-950 `}>{props.onAccordionName}</AccordionHeader>
                    </div>
                </div>
                <AccordionBody>
                    {props.filterBody}
                </AccordionBody>
            </Accordion>
        </>
    );
}