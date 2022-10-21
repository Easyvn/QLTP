import {
    Flex, FormControl, FormLabel, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue
} from "@chakra-ui/react";


import { AppModule } from "core/di/app.module";
import { CaseRepository } from "core/domain/repositories/cases.reposioty";
import { CASE_REPOSITORY } from "core/domain/repositories/master.repository";
const caseRepo: CaseRepository = AppModule.getInstance().provideRepository(CASE_REPOSITORY);

function UploadingModal(props: { progress: number, message: string, isOpen: boolean, onOpen: () => void, onClose: () => void }) {

    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const { isOpen, onOpen, onClose, message, progress } = props;


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Đang tải ({progress}%/100%)</ModalHeader>
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
                                    {message}
                                </FormLabel>
                            </>
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter>

                    {/* <Button onClick={startCreateCase} colorScheme="brand" mr={3} spinner={<BeatLoader size={8} color="white" />}>
                        Xác nhận
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Hủy</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UploadingModal;