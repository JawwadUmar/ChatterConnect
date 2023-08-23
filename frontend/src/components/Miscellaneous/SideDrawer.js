import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';

const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

    const {user} = ChatState();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
      };

      const toast = useToast();
      const handleSearch = () =>{
        if(!search){
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
              });
        }
      }

  return (
    <>
    <Box
    d="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    h = "12%"
    p="5px 5px 5px 5px"
    borderWidth="5px">
      <Tooltip label="Search Users to Chat" hasArrow placeContent="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{"base": "none", md: "flex"}} px = {4}>Search User</Text>
          </Button>
      </Tooltip>
      <Text fontSize="3xl" fontFamily="Work sans"  textAlign="center">
          ChatterConnect
        </Text>
        <div>
            <Menu>
                <MenuButton p ={1}>
                <BellIcon fontSize="3x1"/>
                </MenuButton>
            </Menu>

            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                    <Avatar size="sm"cursor="pointer" name={user.name} src={user.pic}/>
                </MenuButton>

                <MenuList>
                    <ProfileModal user={user}>
                    <MenuItem> My Profile</MenuItem>
                    </ProfileModal>
                    <MenuDivider/>
                    <MenuItem onClick={logoutHandler}> Logout </MenuItem>
                    
                </MenuList>
            </Menu>

            
        </div>

    </Box>

    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer


