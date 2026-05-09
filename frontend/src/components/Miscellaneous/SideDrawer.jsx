import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
// import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";


function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const searchRef = useRef(null);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        handleSearch();
      } else {
        setSearchResult([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResult([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const toast = useToast();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setSearchResult([]);
      setSearch("");
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <div className="navbar-container glass-panel">
        {/* Left: Logo */}
        <Text fontSize="2xl" fontFamily="Inter" fontWeight="extrabold" bgGradient="linear(to-r, cyan.400, blue.500, purple.600)" bgClip="text" minW="200px">
          ChatterConnect
        </Text>

        {/* Center: Search Bar with Dropdown */}
        <div className="search-container" ref={searchRef} style={{ position: "relative", flex: 1, maxWidth: "500px", margin: "0 20px" }}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="whiteAlpha.500" />}
            />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.300"
              color="white"
              borderRadius="full"
              _placeholder={{ color: "whiteAlpha.500" }}
              _hover={{ borderColor: "whiteAlpha.400" }}
              _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px #22d3ee", bg: "whiteAlpha.200" }}
            />
          </InputGroup>

          {/* Search Results Dropdown */}
          {(searchResult.length > 0 || loading) && (
            <div className="search-dropdown glass-panel">
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml="auto" display="flex" mt={2} color="cyan.400" />}
            </div>
          )}
        </div>

        {/* Right: Notifications & Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "200px", justifyContent: "flex-end" }}>
          <Menu>
            <MenuButton p={1} color="white" _hover={{ color: "cyan.300" }} transition="all 0.2s">
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2} bg="#1e293b" borderColor="whiteAlpha.300" color="white" boxShadow="dark-lg">
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  bg="transparent"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  _focus={{ bg: "whiteAlpha.200" }}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.300" }} _active={{ bg: "whiteAlpha.400" }} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg="#1e293b" borderColor="whiteAlpha.300" color="white" boxShadow="dark-lg">
              <ProfileModal user={user}>
                <MenuItem bg="transparent" color="white" _hover={{ bg: "whiteAlpha.200" }} _focus={{ bg: "whiteAlpha.200" }}>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider borderColor="whiteAlpha.300" />
              <MenuItem bg="transparent" color="white" _hover={{ bg: "whiteAlpha.200" }} _focus={{ bg: "whiteAlpha.200" }} onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default SideDrawer;