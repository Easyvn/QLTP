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
import { useEffect, useState } from "react";
import { dateFromString, dateFromString2, formatDate, formatDate2 } from "core/domain/utils/time.utils";
import { Case, Result } from "core/domain/models/case.model";
import { AppModule } from "core/di/app.module";
import { CaseRepository } from "core/domain/repositories/cases.reposioty";
import { CASE_REPOSITORY } from "core/domain/repositories/master.repository";
import { delay } from "core/domain/utils/delay.utils";
const caseRepo: CaseRepository = AppModule.getInstance().provideRepository(CASE_REPOSITORY);

function UpdateCaseModal(props: { isOpen: boolean, _case: Case, onDeleteCase: (_case: Case) => void, onOpen: () => void, onClose: () => void, onRereshData: () => void }) {

  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");


  const { isOpen, onOpen, onClose, _case, onDeleteCase, onRereshData } = props;

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [prosecutionDate, setProsecutionDate] = useState('');
  const [prosecutionNum, setProsecutionNum] = useState("");
  const [handler, setHandler] = useState('');
  const [profileNum, setProfilenNum] = useState("");
  const [isSubmit, setSubmit] = useState(true);
  useEffect(() => {
    if (_case) {
      setName(_case.name);
      setHandler(_case.handler);
      setProsecutionDate(formatDate2(_case.prosecutionDate))
      setProsecutionNum(String(_case.prosecutionNumber));
      setProfilenNum(String(_case.profileNumber))
      setSubmit(_case.isSubmit);
    }
  }, [_case])

  const startCreateCase = () => {
    if (!name) {
      alert("T??n kh??ng ???????c ????? tr???ng!");
      return
    }
    if (!prosecutionDate) {
      alert("Ng??y kh???i t??? / ti???p nh???n kh??ng h???p l???! ng??y c?? d???ng: Ng??y/Th??ng/N??m");
      return
    }
    // if (!handler) {
    //   alert("T??n th??? l?? kh??ng ???????c ????? tr???ng!");
    //   return
    // }
    // if (!prosecutionNum) {
    //   alert("S??? kh???i t??? kh??ng ???????c ????? tr???ng!");
    //   return
    // }
    // if (!profileNum) {
    //   alert("S??? h??? s?? kh??ng ???????c ????? tr???ng!");
    //   return
    // }
    const caseModel = new Case(
      _case.caseId, name,
      dateFromString2(prosecutionDate),
      prosecutionNum,
      new Result("", "-"),
      handler,
      profileNum,
      isSubmit,
    );
    console.log("after convert ", caseModel);

    setLoading(true)

    caseRepo.update(caseModel, {
      onFailure(code, message) {
        setLoading(false);
        alert(JSON.stringify(message))
      },
      onSuccess(data) {
        setLoading(false);
        clearUIData()
        onClose()
        onRereshData()
      },
    }
    )


  }

  function clearUIData() {
    setName("");
    setProsecutionDate("");
    setProfilenNum('0');
    setHandler('');
    setProsecutionNum('0');
    setSubmit(false)
  }

  async function onDelete() {
    onClose()
    await delay(500);
    onDeleteCase(_case)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Th??m v??? ??n, tin b??o</ModalHeader>
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
                  T??n v??? ??n, tin b??o<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='Nh???p t??n v??? ??n, tin b??o'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  value={name}
                  onChange={(value) => setName(value.target.value)}
                  isDisabled={isLoading}
                />
              </>
              <Row>
                <Col>
                  <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    Ng??y kh???i t??? / ti???p nh???n<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='date'
                    lang='vi-VI'
                    placeholder='Nh???p ng??y kh???i t??? / ti???p nh???n'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={prosecutionDate}
                    onChange={(value) => setProsecutionDate(value.target.value)}
                    isDisabled={isLoading}
                  />
                </Col>
                <Col>
                  <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    S??? kh???i t???
                  </FormLabel>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Nh???p s??? kh???i t???'
                    mb='24px'
                    size='lg'
                    value={prosecutionNum}
                    onChange={(value) => setProsecutionNum(value.target.value)}
                    type={"text"}
                    variant='auth'
                    isDisabled={isLoading}
                  />
                </Col>
              </Row>
              <>
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display='flex'>
                  Ng?????i th??? l??
                </FormLabel>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Nh???p ng?????i th??? l??'
                  mb='24px'
                  size='lg'
                  value={handler}
                  onChange={(value) => setHandler(value.target.value)}
                  type={"text"}
                  variant='auth'
                  isDisabled={isLoading}
                />
              </>
              <Row>
                <Col>
                  <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    S??? h??? s?? l??u
                  </FormLabel>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Nh???p s??? h??? s?? l??u'
                    mb='24px'
                    size='lg'
                    value={profileNum}
                    onChange={(value) => setProfilenNum(value.target.value)}
                    type={"text"}
                    variant='auth'
                    isDisabled={isLoading}
                  />
                </Col>
                <Col>
                  <Stack align="left" direction="column" mb='24px'>
                    <FormLabel
                      ms='4px'
                      fontSize='sm'
                      fontWeight='500'
                      color={textColor}
                      display='flex'>
                      N???p l??u
                    </FormLabel>
                    <Switch size="md" colorScheme="brand" isChecked={isSubmit} onChange={(value) => setSubmit(value.target.checked)} />
                  </Stack>
                </Col>
              </Row>
              {/* <FormLabel>K???t qu???</FormLabel> */}
              {/* <Select placeholder="Ch???n k???t qu???" onChange={(value) => value.target.item}>
                <option>Ho??n th??nh</option>
              </Select> */}
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} spinner={<BeatLoader size={8} color="white" />} onClick={onDelete} >
            Xo??
          </Button>
          <Button onClick={startCreateCase} colorScheme="brand" mr={3} spinner={<BeatLoader size={8} color="white" />}>
            L??u
          </Button>
          <Button variant="ghost" onClick={onClose}>H???y</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}


export default UpdateCaseModal;