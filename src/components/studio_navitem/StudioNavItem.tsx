import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactText } from "react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  route: string | any;
  children: ReactText;
}
const NavItem = ({ icon, route, children, ...rest }: NavItemProps) => {
  const router = useRouter();
  return (
    // // <Link

    // //   href="#"
    // //   style={{ textDecoration: "none" }}
    // //   _focus={{ boxShadow: "none" }}
    // // >
    //   {/* _hover=
    //   {{
    //     bg: "gray.400",
    //     color: "white",
    //   }} */}
    <Flex
      onClick={() => router.push(route)}
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "black",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
    // </Link>
  );
};

export default NavItem;
