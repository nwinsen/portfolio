import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import NavLink from "./NavLink";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
const Header = () => {
  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      margin="auto"
      paddingLeft={{ base: "16px", md: "80px" }}
      paddingRight={{ base: "16px", md: "80px" }}
    >
      <HStack
        display={{ base: "none", md: "flex" }}
        flex={"1 1 0%"}
        justifyContent={"space-between"}
        marginTop={"24px"}
        marginBottom={"24px"}
      >
        <HStack display={"flex"} gap={4}>
          <HStack gap={1}>
            <Text
              fontFamily="heading"
              fontWeight={700}
              display={{ base: "none", lg: "block" }}
              fontSize={{ base: "18px" }}
            >
              nicholas
            </Text>
            <Text
              fontFamily="heading"
              fontWeight={700}
              fontSize={{ base: "18px" }}
            >
              {" "}
              winsen.
            </Text>
          </HStack>
          <HStack
            justifyContent={"space-between"}
            display={{ base: "none", md: "flex" }}
            gap={4}
          >
            <NavLink text={"/work"} />
            <NavLink text={"/projects"} />
            <NavLink text={"/contact"} />
          </HStack>
        </HStack>
        <HStack display={{ base: "none", md: "flex" }}>
          <FaGithub color="#7f7f7f" />
          <Text fontFamily="body" color={"#7f7f7f"}>
            /nwinsen
          </Text>
          <FaLinkedin color="#7f7f7f" />
          <Text fontFamily="body" color={"#7f7f7f"}>
            /in/nwinsen
          </Text>
        </HStack>
      </HStack>
      <VStack
        display={{ base: "flex", md: "none" }}
        marginTop={"24px"}
        marginBottom={"24px"}
        alignItems={"flex-start"}
      >
        <Text fontFamily="heading" fontWeight={700} fontSize={{ base: "36px" }}>
          {" "}
          nicholas winsen.
        </Text>
        <HStack>
          <NavLink text={"/work"} />
          <NavLink text={"/projects"} />
          <NavLink text={"/contact"} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Header;
