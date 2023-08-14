import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const CustomModal = ({ isOpen, openModal, closeModal, modalBody }) => {
    return (
        <>
            <Button onPress={openModal}>Open Modal</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add an expense</ModalHeader>
                            <ModalBody className="mb-6">
                                {modalBody}
                            </ModalBody>
                            {/* <ModalFooter>
                                <Button color="danger" variant="light" onClick={closeModal}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Create
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CustomModal;