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
    <Flex
      onClick={() => router.push(route)}
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _groupHover={{
        color: "grey",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "grey",
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
