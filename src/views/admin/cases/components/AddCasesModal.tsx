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


function AddModal(props: { isOpen: boolean, onOpen: () => void, onClose: () => void, onRereshData: () => void }) {

  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const { isOpen, onOpen, onClose, onRereshData } = props;

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [prosecutionDate, setProsecutionDate] = useState('');
  const [prosecutionNum, setProsecutionNum] = useState('');
  const [handler, setHandler] = useState('');
  const [profileNum, setProfilenNum] = useState('');
  const [isSubmit, setSubmit] = useState(false);

  const startCreateCase = () => {
    if (!name) {
      alert("Tên không được để trống!");
      return
    }
    if (!prosecutionDate) {
      alert("Ngày khởi tố / tiếp nhận không hợp lệ! ngày có dạng: Ngày/Tháng/Năm");
      return
    }
    // if (!handler) {
    //   alert("Tên thụ lý không được để trống!");
    //   return
    // }
    // if (!prosecutionNum) {
    //   alert("Số khởi tố không được để trống!");
    //   return
    // }
    // if (!profileNum) {
    //   alert("Số hồ sơ không được để trống!");
    //   return
    // }

    const caseModel = new Case(
      "", name,
      dateFromString2(prosecutionDate),
      prosecutionNum,
      new Result("", "-"),
      handler,
      profileNum,
      isSubmit,
    );
    setLoading(true);
    console.log("case model", caseModel,);


    caseRepo.create(caseModel, {
      onFailure(code, message) {
        setLoading(false);
        alert(JSON.stringify(message))
      },
      onSuccess(data) {
        setLoading(false);
        clearUIData();
        onClose()
        onRereshData()
      },
    })
  }

  function clearUIData() {
    setName("");
    setProsecutionDate("");
    setProfilenNum('');
    setHandler('');
    setProsecutionNum('');
    setSubmit(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thêm vụ án, tin báo</ModalHeader>
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
                  Tên vụ án, tin báo<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='Nhập tên vụ án, tin báo'
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
                    Ngày khởi tố / tiếp nhận<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='date'
                    lang='vi-VI'
                    placeholder='Nhập ngày khởi tố / tiếp nhận'
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
                    Số khởi tố
                  </FormLabel>
                  <Input
                    fontSize='sm'
                    placeholder='Nhập số khởi tố'
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
                  Người thụ lý
                </FormLabel>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Nhập người thụ lý'
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
                    Số hồ sơ lưu
                  </FormLabel>
                  <Input
                    fontSize='sm'
                    placeholder='Nhập số hồ sơ lưu'
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
                      Nộp lưu
                    </FormLabel>
                    <Switch size="md" colorScheme="brand" isChecked={isSubmit} onChange={(value) => setSubmit(value.target.checked)} />
                  </Stack>
                </Col>
              </Row>
              {/* <FormLabel>Kết quả</FormLabel>
              <Select placeholder="Chọn kết quả" onChange={(value) => value.target.item}>
                <option>Hoàn thành</option>
              </Select> */}
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={startCreateCase} colorScheme="brand" mr={3} spinner={<BeatLoader size={8} color="white" />}>
            Lưu
          </Button>
          <Button variant="ghost" onClick={onClose}>Hủy</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddModal;