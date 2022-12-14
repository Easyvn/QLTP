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
import { dateFromString, dateFromString2 } from "core/domain/utils/time.utils";
import { Case, Result } from "core/domain/models/case.model";
import { AppModule } from "core/di/app.module";
import { CaseRepository } from "core/domain/repositories/cases.reposioty";
import { CASE_REPOSITORY, EVIDENCE_REPOSITORY } from "core/domain/repositories/master.repository";
import { Evidence } from "core/domain/models/evidences.model";
import { useEvidenceResults } from "contexts/evidence_result.context";
import { useEvidenceTypes } from "contexts/evidence_type.context";
import { EvidenceRepository } from "core/domain/repositories/evidences.repository";
import { LLOG } from "core/domain/utils/log.utils";
import { delay } from "core/domain/utils/delay.utils";
const evidenceRepo: EvidenceRepository = AppModule.getInstance().provideRepository(EVIDENCE_REPOSITORY);

function UpdateEvidenceModal(props: {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  onRefreshData: () => void,
  evidence: Evidence,
  onDeleteEvidence: (evidence: Evidence) => void
}) {

  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const { isOpen, onOpen, onClose, onRefreshData, onDeleteEvidence, evidence } = props;

  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [evidenceTypeId, setEvidenceTypeId] = useState('');
  const [evidenceResultId, setEvidenceResultId] = useState('');
  const [species, setSpecies] = useState('');
  const [symbol, setSymbol] = useState('');
  const [characteristic, setCharacteristic] = useState('');
  const [resultDetail, setResultDetail] = useState('');
  const { evidenceResults } = useEvidenceResults()
  const { evidenceTypes } = useEvidenceTypes();

  useEffect(() => {
    if (evidence) {
      setEvidenceTypeId(evidence.evidenceTypeId);
      setQuantity(evidence.quantity.toString());
      setSpecies(evidence.species);
      setSymbol(evidence.symbol);
      setCharacteristic(evidence.characteristics);
      setResultDetail(evidence.resultDetail);
      setEvidenceResultId(evidence.resultId);
    }
  }, [evidence])

  const startUpdateEvidence = () => {
    if (!evidenceTypeId) {
      alert("Vui l??ng ch???n lo???i v???t ch???ng!")
    }
    if (!quantity || Number(quantity) <= 0) {
      alert("S??? l?????ng kh??ng ???????c ????? tr???ng v?? nhi???u h??n 0!");
      return
    }
    if (!species) {
      alert("Ch???ng lo???i v???t ch???ng kh??ng ???????c ????? tr???ng!");
      return
    }
    if (!symbol) {
      alert("K?? hi???u v???t ch???ng kh??ng ???????c ????? tr???ng!");
      return
    }
    if (!characteristic) {
      alert("?????c ??i???m v???t ch???ng kh??ng ???????c ????? tr???ng!");
      return
    }
    if (!evidenceResultId) {
      alert("Vui l??ng ch???n k???t qu??? v???t ch???ng!")
    }
    const model = new Evidence(
      evidence.id,
      evidenceTypeId,
      evidence.caseId,
      Number(quantity),
      species,
      symbol,
      characteristic,
      evidenceResultId,
      resultDetail
    );
    LLOG.d("update evidence", JSON.stringify(model));
    setLoading(true);
    evidenceRepo.update(model, {
      onFailure(code, message) {
        setLoading(false);
        alert(JSON.stringify(message));
      },
      onSuccess(data) {
        setLoading(false);
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
  async function onDelete() {
    onClose()
    await delay(500);
    onDeleteEvidence(evidence)
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Th??m v???t ch???ng</ModalHeader>
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
                  Lo???i v???t ch???ng<Text color={brandStars}>*</Text>
                </FormLabel>
                <Select mb='24px' placeholder="Ch???n lo???i" onChange={
                  (value) => {
                    LLOG.d("On selected", value.target.value);
                    setEvidenceTypeId(value.target.value)
                  }
                } value={evidenceTypeId}>
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
                    S??? l?????ng v???t ch???ng
                  </FormLabel>
                  <Input
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='number'
                    placeholder='Nh???p s??? l?????ng v???t ch???ng'
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
                    Ch???ng lo???i
                  </FormLabel>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Nh???p ch???ng lo???i'
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
                  K?? hi???u
                </FormLabel>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Nh???p k?? hi???u'
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
                ?????c ??i???m
              </FormLabel>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Nh???p ?????c ??i???m'
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
                      K???t qu???
                    </FormLabel>
                    <Select placeholder="Ch???n k???t qu???"
                      onChange={value => {
                        setEvidenceResultId(value.target.value);
                      }}
                      value={evidenceResultId}
                    >
                      {
                        evidenceResults.map(ele => <option key={ele.id} value={ele.id}>{ele.name}</option>
                        )
                      }
                    </Select>
                  </Stack>
                </Col>
                <Col>
                  <FormLabel>Chi ti???t k???t qu???</FormLabel>
                  <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Nh???p chi ti???t k???t qu???'
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
          <Button colorScheme="red" mr={3} spinner={<BeatLoader size={8} color="white" />} onClick={onDelete} >
            Xo??
          </Button>
          <Button onClick={startUpdateEvidence} colorScheme="brand" mr={3} spinner={<BeatLoader size={8} color="white" />}>
            L??u
          </Button>
          <Button variant="ghost" onClick={onClose}>H???y</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default UpdateEvidenceModal;