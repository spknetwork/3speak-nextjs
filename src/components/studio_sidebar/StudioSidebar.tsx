import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  FaCloudUploadAlt,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaVideo,
} from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import styled from "styled-components";
import NavItem from "../studio_navitem/StudioNavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  route?: string;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "Dashboard",
    icon: FiHome,
    route: "/studio",
  },
  { name: "Upload", icon: FaCloudUploadAlt, route: "/studio/upload" },
  { name: "Videos", icon: FaVideo, route: "/studio/studio_videos" },

  { name: "My Channel", icon: FaExternalLinkAlt, route: "/studio/studio_videos" },
  { name: "Logout", icon: FaSignOutAlt, route: "/studio/studio_videos" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text> */}
        <Flex justifyContent="center" alignItems={"center"} width="100%">
          <StyledLink href="/studio">
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              width={"180px"}
            >
              <Image
                src="/main_logo.svg"
                alt="3speak logo"
                width={100}
                height={100}
              />
            </Box>
          </StyledLink>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          route={link.route}
          color={"#6e707e"}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;

const StyledLink = styled(Link)`
  cursor: pointer;
`;
