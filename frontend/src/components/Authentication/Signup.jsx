import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { ChatState } from "../../Context/ChatProvider";

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);  //Loading
    const toast = useToast();
    const history = useHistory();
    const { setUser } = ChatState();

    const handleClick = () => setShow(!show);

    const postDetails=(pics)=>{
      setLoading(true);
      if(pics ===undefined){
        toast({
          title: 'Please Select an Image!',
          // description: "We've created your account for you.",
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
        return;
      }

      if(pics.type ==="image/jpeg" || pics.type === "image/png"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dfyezpgnh")
        fetch("https://api.cloudinary.com/v1_1/dfyezpgnh/image/upload", {
          method:'post',
          body: data,
        }).then((res) => res.json())
        .then(data=>{
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      }
      else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
    }

    const submitHandler = async () => {
      setLoading(true);
      if (!name || !email || !password || !confirmpassword) {
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
      if (password !== confirmpassword) {
        toast({
          title: "Passwords Do Not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
    }

    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
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
        <FormControl id='first-name' isRequired>
            <FormLabel color="whiteAlpha.800">Name</FormLabel>
            <Input 
              placeholder='Enter your Name'
              onChange={(e) => setName(e.target.value)}
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.300"
              color="white"
              _placeholder={{ color: "whiteAlpha.500" }}
              _hover={{ borderColor: "whiteAlpha.400" }}
              _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px #22d3ee", bg: "whiteAlpha.200" }}
            />
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel color="whiteAlpha.800">Email</FormLabel>
            <Input 
              placeholder='Enter your Email'
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

        <FormControl id="confirm-password" isRequired>
        <FormLabel color="whiteAlpha.800">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
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

      <FormControl id="pic">
        <FormLabel color="whiteAlpha.800">Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          bg="whiteAlpha.100"
          borderColor="whiteAlpha.300"
          color="whiteAlpha.800"
          _hover={{ borderColor: "whiteAlpha.400" }}
          _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px #22d3ee", bg: "whiteAlpha.200" }}
          sx={{
            '::file-selector-button': {
              bg: 'whiteAlpha.200',
              color: 'white',
              border: 'none',
              borderRadius: 'md',
              mr: 2,
              px: 3,
              cursor: 'pointer'
            }
          }}
        />
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
        Sign Up
      </Button>


    </VStack>
  )
}

export default Signup