import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const toast = useToast();
    const { setUser } = ChatState();

    // const [picLoading, setPicLoading] = useState(false);

    const handleClick = () => setShow(!show);


    const submitHandler = async () => {
      setLoading(true);
      if (!email || !password) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
  
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
  
        const { data } = await axios.post(
          "/api/user/login",
          { email, password },
          config
        );
  
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data);
        setLoading(false);
        history.push("/chat");
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };


  return (
    <VStack spacing='5px'>
       
        <FormControl id='email' isRequired>
            <FormLabel color="whiteAlpha.800">Email</FormLabel>
            <Input 
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.300"
              color="white"
              _placeholder={{ color: "whiteAlpha.500" }}
              _hover={{ borderColor: "whiteAlpha.400" }}
              _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px #22d3ee", bg: "whiteAlpha.200" }}
            />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel color="whiteAlpha.800">Password</FormLabel>
            <InputGroup>
              <Input 
                type={show? "text" : 'password'}
                placeholder='Enter your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="whiteAlpha.100"
                borderColor="whiteAlpha.300"
                color="white"
                _placeholder={{ color: "whiteAlpha.500" }}
                _hover={{ borderColor: "whiteAlpha.400" }}
                _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px #22d3ee", bg: "whiteAlpha.200" }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick} colorScheme="cyan" variant="ghost" color="cyan.400" _hover={{ bg: "whiteAlpha.200" }}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
        </FormControl>

      <Button
        bgGradient="linear(to-r, cyan.400, blue.500)"
        color="white"
        _hover={{ bgGradient: "linear(to-r, cyan.500, blue.600)" }}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler} 
        isLoading={loading}
        border="none"
      >
        Login
      </Button>

      <Button
        variant="outline"
        borderColor="cyan.400"
        color="cyan.400"
        _hover={{ bg: "whiteAlpha.200" }}
        width="100%"
        onClick={()=>{
            setEmail("guest@example.com");
            setPassword("123456");
        }} 
      >
        Get User Credentials
      </Button>


    </VStack>
  )
}

export default Login