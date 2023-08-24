import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();
    const { selectedChat, setSelectedChat, user } = ChatState();

    const handleRemove =() =>{

    }

    const handleRename = () =>{

    }

    const handleSearch = ()=>{
        
    }
    

    return (
        <>
          <IconButton 
          d = {{base : "flex"}}
          icon={<ViewIcon/>}
           onClick={onOpen}/>
           
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader 
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
              >{selectedChat.chatName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody
               d="flex" flexDir="column" alignItems="center"
              >
                <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                    {selectedChat.users.map((u) => (
                        <UserBadgeItem
                        key={u._id}
                        user={u}
                        handleFunction={() => handleRemove(u)}
                      />
                    ))}
                </Box>
                <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
                
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UpdateGroupChatModal