/* eslint-disable */

import React from "react";
import { useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
//import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import BeatLoader from "react-spinners/BeatLoader";
import routes from "components/navigation/routes";
import { useAuthentication } from "contexts/auth/auth.context";
import { useState } from "react";
import { AuthenticationRepository } from "core/domain/repositories/authentication.repository";
import { AppModule } from "core/di/app.module";
import { AUTH_REPOSITORY } from "core/domain/repositories/master.repository";
const authRepo: AuthenticationRepository | null = AppModule.getInstance().provideRepository(AUTH_REPOSITORY)


function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);


  const [isLoading, setIsLoading] = React.useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthenticated } = useAuthentication();
  const [errMess, setErrMess] = useState("");

  const history = useHistory();

  const nextPath = (path: string) => {
    history.replace(path);
  }

  const onSignIn = async () => {
    // alert("OK!!");
    //alert("OK!!");
    if (!userName) {
      alert("Tên đăng nhập không được để trống.")
      return
    }
    if (!password) {
      alert("Mật khẩu không được để trống.")
      return
    }
    setIsLoading(true);

    authRepo?.login(userName, password, {
      onSuccess(data) {
        setIsLoading(false);
        setAuthenticated(true);
        nextPath(routes.ADMIN);
      },
      onFailure(code, message) {
        setIsLoading(false);
        let _message = message.message;
        console.log(message);
        if (message.code == 101) {
          _message = "Tài khoản không tồn tại";
        }
        setErrMess(_message);
        alert(_message);
      },
    })
  }

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='center'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Đăng nhập
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Nhập tài khoản và mật khẩu để truy cập vào hệ thống
          </Text>
        </Box>
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
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Tài khoản<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='text'
              placeholder='Nhập tài khoản'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={userName}
              onChange={(value) => setUserName(value.target.value)}
              isDisabled={isLoading}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Mật khẩu<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Nhập mật khẩu'
                mb='24px'
                size='lg'
                value={password}
                onChange={(value) => setPassword(value.target.value)}
                type={show ? "text" : "password"}
                variant='auth'
                isDisabled={isLoading}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Button
              onClick={onSignIn}
              isLoading={isLoading}
              spinner={<BeatLoader size={8} color="white" />}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              Đăng nhập
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
