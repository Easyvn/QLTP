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

function AddModal(props: { isOpen: boolean, onOpen: () => void, onClose: () => void }) {

  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const { isOpen, onOpen, onClose } = props;

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [prosecutionDate, setProsecutionDate] = useState('');
  const [prosecutionNum, setProsecutionNum] = useState(0);
  const [handler, setHandler] = useState('');
  const [profileNum, setProfilenNum] = useState(0);
  const [isSubmit, setSubmit] = useState(true);

  const startCreateCase = () => {
    if (!name) {
      alert("Tên không được để trống!");
      return
    }
    if (!prosecutionDate) {
      alert("Ngày khởi tố / tiếp nhận không hợp lệ! ngày có dạng: Ngày/Tháng/Năm");
      return
    }
    if (!handler) {
      alert("Tên thụ lý không được để trống!");
      return
    }
    // const caseModel = new Case(
    //   "", name,
    //   dateFromString2(prosecutionDate, "-"),
    //   prosecutionNum,
    //   new Result("", "-"),
    //   handler,
    //   profileNum,
    //   isSubmit,
    // );
    // setLoading(true)

    // caseRepo.create(caseModel, {
    //   onFailure(code, message) {
    //     setLoading(false);
    //     alert(JSON.stringify(message))
    //   },
    //   onSuccess(data) {
    //     setLoading(false);
    //   },
    // })


  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thêm vật chứng</ModalHeader>
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
                  Loại vật chứng<Text color={brandStars}>*</Text>
                </FormLabel>
                <Select mb='24px' placeholder="Chọn loại" onChange={(value) => value.target.item}>
                  <option>Tiền giả</option>
                  <option>Vũ khí quân dụng</option>
                  <option>Loại khác</option>
                </Select>
              </>
              <Row>
                <Col>
                  <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    Số lượng vật chứng
                  </FormLabel>
                  <Input
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='number'
                    placeholder='Nhập số lượng vật chứng'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    //value={prosecutionDate}
                    //onChange={(value) => setProsecutionDate(value.target.value)}
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
                    Chủng loại
                  </FormLabel>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Nhập chủng loại'
                    mb='24px'
                    size='lg'
                    //value={prosecutionNum}
                    //onChange={(value) => setProsecutionNum(Number(value.target.value))}
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
                  Ký hiệu
                </FormLabel>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Nhập ký hiệu'
                  mb='24px'
                  size='lg'
                  value={handler}
                  //onChange={(value) => setHandler(value.target.value)}
                  type={"text"}
                  variant='auth'
                  isDisabled={isLoading}
                />
              </>
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Đặc điểm
              </FormLabel>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Nhập đặc điểm'
                mb='24px'
                size='lg'
                //value={profileNum}
                //onChange={(value) => setProfilenNum(Number(value.target.value))}
                type={"text"}
                variant='auth'
                isDisabled={isLoading}
              />
              <Row>
                <Col>
                  <Stack align="left" direction="column" mb='24px'>
                    <FormLabel
                      ms='4px'
                      fontSize='sm'
                      fontWeight='500'
                      color={textColor}
                      display='flex'>
                      Kết quả
                    </FormLabel>
                    <Select placeholder="Chọn kết quả" 
                      //</Stack>onChange={(value) => value.target.item}
                    >
                      <option>Đã xử lý</option>
                    </Select>  
                  </Stack>
                </Col>
                <Col>
                  <FormLabel>Chi tiết kết quả</FormLabel>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Nhập chi tiết kết quả'
                    size='lg'
                    //value={profileNum}
                    //onChange={(value) => setProfilenNum(Number(value.target.value))}
                    type={"text"}
                    variant='auth'
                    isDisabled={isLoading}
                  />
                </Col>
              </Row>
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