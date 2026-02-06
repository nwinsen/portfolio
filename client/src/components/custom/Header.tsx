import { Box, HStack, Text, VStack, Link } from "@chakra-ui/react";
import NavLink from "./smaller/NavLink";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
const Header = () => {
  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      margin="auto"
      paddingLeft={{ base: "16px", md: "120px" }}
      paddingRight={{ base: "16px", md: "120px" }}
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
            <Link href="/">
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
            </Link>
          </HStack>
          <HStack
            justifyContent={"space-between"}
            display={{ base: "none", md: "flex" }}
            gap={4}
          >
            <NavLink text={"/work"} href={"/exp"} />
            <NavLink text={"/projects"} href={"/exp#projects"} />
            <NavLink text={"/contact"} href={"/contact"} />
            <NavLink text={"/blog"} href={"/blog"} />
          </HStack>
        </HStack>
        <HStack display={{ base: "none", md: "flex" }}>
          <Link href="https://github.com/nwinsen">
            <FaGithub color="#7f7f7f" />
            <Text fontFamily="body" color={"#7f7f7f"}>
              /nwinsen
            </Text>
          </Link>
          <Link href="https://linkedin.com/in/nwinsen">
            <FaLinkedin color="#7f7f7f" />
            <Text fontFamily="body" color={"#7f7f7f"}>
              /in/nwinsen
            </Text>
          </Link>
        </HStack>
      </HStack>
      <VStack
        display={{ base: "flex", md: "none" }}
        marginTop={"24px"}
        marginBottom={"24px"}
        alignItems={"flex-start"}
      >
        <Link href="/">
          <Text
            fontFamily="heading"
            fontWeight={700}
            fontSize={{ base: "36px" }}
          >
            {" "}
            nicholas winsen.
          </Text>
        </Link>
        <HStack>
          <NavLink text={"/work"} href={"/exp"} />
          <NavLink text={"/projects"} href={"/exp#projects"} />
          <NavLink text={"/contact"} href={"/contact"} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Header;
