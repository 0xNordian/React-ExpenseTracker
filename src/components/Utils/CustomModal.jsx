import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";

const CustomModal = ({ isOpen, openModal, modalBody, modalBtnTitle, modalInnerTitle }) => {
    return (
        <>
            <Button className="rounded-full min-w-unit-0" onPress={openModal}>{modalBtnTitle}</Button>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                isDismissable={false}
                >
                <ModalContent>

                            <ModalHeader className="flex flex-col gap-1">{modalInnerTitle}</ModalHeader>
                            <ModalBody className="mb-6">
                                {modalBody}
                            </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CustomModal;