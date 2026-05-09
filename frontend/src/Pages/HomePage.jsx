import React, { useEffect } from 'react'
import { Box,Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text,} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chat");
  }, [history]);

  return (  
    <Container maxW='xl' centerContent>
        <Box
          className="glass-panel"
          display="flex"
          justifyContent="center"
          p={3}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
        >
            <Text fontSize="4xl" fontFamily="Inter" fontWeight="extrabold" bgGradient="linear(to-r, cyan.400, blue.500, purple.600)" bgClip="text">
              ChatterConnect
            </Text>
        </Box>

        <Box className="glass-panel" w="100%" p={4} borderRadius="lg" color="white">
        <Tabs variant='soft-rounded' colorScheme="cyan">
  <TabList mb="1em">
    <Tab width="50%" color="whiteAlpha.800" _selected={{ color: "white", bg: "cyan.600" }}>Login</Tab>
    <Tab width="50%" color="whiteAlpha.800" _selected={{ color: "white", bg: "cyan.600" }}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
        <Login/>
     
    </TabPanel>
    <TabPanel>
        <Signup/>
   
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>

    </Container>
  )
}

export default HomePage
