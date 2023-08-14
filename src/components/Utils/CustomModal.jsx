import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";

const CustomModal = ({ isOpen, openModal, modalBody }) => {
    return (
        <>
            <Button onPress={openModal}>Open Modal</Button>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                isDismissable={false}>
                <ModalContent>

                            <ModalHeader className="flex flex-col gap-1">Add an expense</ModalHeader>
                            <ModalBody className="mb-6">
                                {modalBody}
                            </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CustomModal;