import { Text } from "@chakra-ui/react";

const NavLink = ({ text }: { text: string }) => {
  return (
    <Text
      fontFamily="mono"
      textDecorationLine={"underline"}
      textUnderlineOffset={"0.2em"}
      fontSize={{ base: "14px", lg: "12px" }}
    >
      {text}
    </Text>
  );
};

export default NavLink;
