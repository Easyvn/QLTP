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
import { EVIDENCE_REPOSITORY } from "core/domain/repositories/master.repository";
import { EvidenceRepository } from "core/domain/repositories/evidences.repository";
import { useEvidenceResults } from "contexts/evidence_result.context";
import { useEvidenceTypes } from "contexts/evidence_type.context";
import { LLOG } from "core/domain/utils/log.utils";
import { Evidence } from "core/domain/models/evidences.model";

const evidenceRepo: EvidenceRepository = AppModule.getInstance().provideRepository(EVIDENCE_REPOSITORY);

function AddModal(props: { isOpen: boolean, onOpen: () => void, onClose: () => void, onRefreshData: () => void, caseId: string }) {

  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const { isOpen, onOpen, onClose, caseId, onRefreshData } = props;

  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [evidenceTypeId, setEvidenceTypeId] = useState('');
  const [evidenceResultId, setEvidenceResultId] = useState('');
  const [species, setSpecies] = useState('');
  const [symbol, setSymbol] = useState('');
  const [characteristic, setCharacteristic] = useState('');
  const [resultDetail, setResultDetail] = useState('');
  const { evidenceResults } = useEvidenceResults()
  const { evidenceTypes } = useEvidenceTypes()

  const startCreateEvidence = () => {
    if (!evidenceTypeId) {
      alert("Vui lòng chọn loại vật chứng!")
    }
    if (!quantity || Number(quantity) <= 0) {
      alert("Số lượng không được để trống và nhiều hơn 0!");
      return
    }
    if (!species) {
      alert("Chủng loại vật chứng không được để trống!");
      return
    }
    if (!symbol) {
      alert("Ký hiệu vật chứng không được để trống!");
      return
    }
    if (!characteristic) {
      alert("Đặc điểm vật chứng không được để trống!");
      return
    }
    if (!evidenceResultId) {
      alert("Vui lòng chọn kết quả vật chứng!")
    }
    const evidence = new Evidence(
      '',
      evidenceTypeId,
      caseId,
      Number(quantity),
      species,
      symbol,
      characteristic,
      evidenceResultId,
      resultDetail
    );
    LLOG.d("create evidence", JSON.stringify(evidence));
    setLoading(true);
    evidenceRepo.create(evidence, {
      onFailure(code, message) {
        alert(message)
      },
      onSuccess(data) {
        onClose();
        onRefreshData();
        clearUIData();
      },
    })
  }

  function clearUIData() {
    setEvidenceTypeId('');
    setQuantity('');
    setSpecies('');
    setSymbol('');
    setCharacteristic('');
    setResultDetail('');
    setEvidenceResultId('');
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
                <Select mb='24px' placeholder="Chọn loại" onChange={
                  (value) => {
                    LLOG.d("On selected", value.target.value);
                    setEvidenceTypeId(value.target.value)
                  }
                }>
                  {
                    evidenceTypes.map((ele, index) => <option key={index} value={ele.id}
                    >{ele.name}</option>)
                  }
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
                    value={quantity}
                    onChange={(value) => setQuantity(value.target.value)}
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
                    value={species}
                    onChange={(value) => setSpecies(value.target.value)}
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
                  value={symbol}
                  onChange={(value) => setSymbol(value.target.value)}
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
                value={characteristic}
                onChange={(value) => setCharacteristic(value.target.value)}
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
                      onChange={value => {
                        setEvidenceResultId(value.target.value);
                      }}
                    >
                      {
                        evidenceResults.map(ele => <option key={ele.id} value={ele.id}>{ele.name}</option>
                        )
                      }
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
                    value={resultDetail}
                    onChange={(value) => setResultDetail(value.target.value)}
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
          <Button onClick={startCreateEvidence} colorScheme="brand" mr={3} spinner={<BeatLoader size={8} color="white" />}>
            Lưu
          </Button>
          <Button variant="ghost" onClick={onClose}>Hủy</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddModal;