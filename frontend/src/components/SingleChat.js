import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const SingleChat = ({fetchAgain, setFetchAgain}) => {
  
    const {user, selectedChat, setSelectedChat} = ChatState();
  
    return (
    <>
    {selectedChat ? (
        <>
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }} //only going to be displayed when the display is small
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
          </Text>
          
          </>
    ):(
        <Box
        d = "flex"
        alignItems="center"
        justifyContent="center"
        h ="100%"
        >
            <Text
            fontsize = "3x1"
            pb = {3}
            fontFamily="Work Sans"
            >
                Click on a User to Chat

            </Text>
            
        </Box>
    )
}
    </>
  )
}

export default SingleChat