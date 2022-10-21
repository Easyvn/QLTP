import {
    Button, Flex, FormControl, FormLabel, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue
} from "@chakra-ui/react";

import BeatLoader from "react-spinners/BeatLoader";

import { AppModule } from "core/di/app.module";
import { EvidenceDocument } from "core/domain/models/evidences.model";
import { EvidenceDocumentRepository } from "core/domain/repositories/evidences.repository";
import { EVIDENCE_DOCS_REPOSITORY } from "core/domain/repositories/master.repository";
import { useState } from "react";
const docsRepo: EvidenceDocumentRepository = AppModule.getInstance().provideRepository(EVIDENCE_DOCS_REPOSITORY);

function ConfirmDeleteModal(props: {
    document: EvidenceDocument,
    message: string,
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onRefreshData: () => void
}) {

    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const { isOpen, onOpen, onClose, message, document, onRefreshData } = props;

    const [isLoading, setLoading] = useState(false);


    const onDelete = () => {
        setLoading(true);
        docsRepo.delete(document, {
            onFailure(code, message) {
                alert(JSON.stringify(message));
                setLoading(false);
                onClose();
            },
            onSuccess(data) {
                onRefreshData()
                setLoading(false);
                onClose();
            },
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Xác nhận xoá</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        zIndex='2'
                        direction='column'
                        w={{ base: "100%", md: "420px" }}
                        maxW='100%'
                        background='transparent'
                        borderRadius='15px'
                        mx={{ base: "auto", lg: "unset" }}
                        me='auto'
                        mb={{ base: "20px", md: "auto" }}>
                        <FormControl>
                            <>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    {isLoading ? 'Vui lòng chờ...' : message}
                                </FormLabel>
                            </>
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter>

                    <Button onClick={onDelete} colorScheme="brand" mr={3} spinner={<BeatLoader size={8} color="white" />}>
                        Xác nhận
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Hủy</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmDeleteModal;