import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { hive } from "@/hooks/auth/hive";
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
  bgColor: string;
  colorMode: string;
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

  {
    name: "My Channel",
    icon: FaExternalLinkAlt,
    route: "/studio/studio_videos",
  },

  //TODO: assign it a function named as hive.logout
  { name: "Logout", icon: FaSignOutAlt, route: "/" },
];

const SidebarContent = ({
  onClose,
  bgColor,
  colorMode,
  ...rest
}: SidebarProps) => {
  const router = useRouter();
  return (
    <Box
      transition="3s ease"
      bgColor={bgColor}
      boxShadow="lg"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex justifyContent="center" alignItems={"center"} width="100%">
          <Box
            cursor={"pointer"}
            onClick={() => router.push("/")}
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            width={"180px"}
          >
            <Image
              src="/main_logo.svg"
              alt="3speak logo"
              width={"auto"}
              height={"auto"}
            />
          </Box>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          route={link.route}
          color={colorMode === "dark" ? "white" : "black"}
          key={link.name}
          icon={link.icon}
          fontSize={"xl"}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;

// const StyledLink = styled(Link)`
//   cursor: pointer;
// `;
