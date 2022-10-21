import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Flex,
    FormLabel,
    Text,
    Input,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    Icon,
    Stack,
    Switch,
    Select,

} from "@chakra-ui/react";

import BeatLoader from "react-spinners/BeatLoader";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import { dateFromString, dateFromString2 } from "core/domain/utils/time.utils";
import { Case, Result } from "core/domain/models/case.model";
import { AppModule } from "core/di/app.module";
import { CaseRepository } from "core/domain/repositories/cases.reposioty";
import { CASE_REPOSITORY } from "core/domain/repositories/master.repository";
const caseRepo: CaseRepository = AppModule.getInstance().provideRepository(CASE_REPOSITORY);

function ConfirmDeleteModal(props: {
    _case: Case, message: string, isOpen: boolean, onOpen: () => void, onClose: () => void,
    onRefreshData: () => void
}) {

    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const { isOpen, onOpen, onClose, message, _case, onRefreshData } = props;

    const [isLoading, setLoading] = useState(false);


    const confirmDelete = () => {
        // onConfirm(_case);
        setLoading(true)
        caseRepo.delete(_case, {
            onSuccess(data) {                
                setLoading(false);
                onRefreshData()
                onClose()
            },
            onFailure(code, message) {
                setLoading(false);
                alert(JSON.stringify(message));
                onClose()
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
                                    {isLoading ? "Vui lòng đợi..." : message}
                                </FormLabel>
                            </>
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter>

                    {
                        !isLoading ? <Button onClick={confirmDelete} colorScheme="brand" mr={3} spinner={<BeatLoader size={8} color="white" />}>
                            Xác nhận
                        </Button> : <></>
                    }
                    <Button variant="ghost" onClick={onClose}>Hủy</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmDeleteModal;