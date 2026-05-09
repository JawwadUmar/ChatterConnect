import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
          {children ? (
            <span onClick={onOpen}>{children}</span>
          ) : (
            <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} colorScheme="cyan" variant="ghost" />
          )}
           <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px" bg="#0f172a" color="white" borderRadius="2xl" border="1px solid rgba(255,255,255,0.1)" boxShadow="2xl">
          <ModalHeader
            fontSize={"40px"}
            fontFamily={"Inter"}
            display="flex"
            justifyContent={"center"}
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
            fontWeight="extrabold"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton color="whiteAlpha.700" _hover={{ color: "white" }} />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            pb={6}
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              border="4px solid"
              borderColor="cyan.500"
              boxShadow="0 0 20px rgba(6, 182, 212, 0.4)"
            />
            <Text
              fontSize={{ base: "22px", md: "24px" }}
              fontFamily="Inter"
              color="whiteAlpha.800"
              fontWeight="500"
            >
              {user.email}
            </Text>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button
              bgGradient="linear(to-r, cyan.400, blue.500)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, cyan.500, blue.600)" }}
              border="none"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
           
          </>
  
    );
          };

export default ProfileModal