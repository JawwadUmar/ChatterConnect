import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';

const SideDrawer = () => {

    const {user} = ChatState();
    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
      };

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
          <Button variant="ghost">
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
    </>
  )
}

export default SideDrawer


