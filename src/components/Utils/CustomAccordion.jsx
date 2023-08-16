import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

function CustomAccordion(props) {
    const defaultContent = props.filters
        
    return (
        <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Accordion 1" title="Filters">
                {defaultContent}
            </AccordionItem>
            {/* <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                {defaultContent}
            </AccordionItem> */}
        </Accordion>
    );
}

export default CustomAccordion;
