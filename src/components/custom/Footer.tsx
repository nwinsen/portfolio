import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaCodeBranch,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <Box
        marginTop={"40px"}
        bg={{ _light: "rgba(229, 231, 235, 0.5)", _dark: "#374151" }}
      >
        <VStack>
          <HStack
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop={"16px"}
          >
            <Link to="mailto:nickgwin@icloud.com">
              <HStack>
                <Text>
                  <FaEnvelope />
                </Text>
                <Text display={{ base: "none", md: "flex" }}>
                  nicholasgwinsen@gmail.com
                </Text>
              </HStack>
            </Link>
            <Link to="https://github.com/nwinsen">
              <HStack>
                <Text>
                  <FaGithub />
                </Text>
                <Text display={{ base: "none", md: "flex" }}>nwinsen</Text>
              </HStack>
            </Link>
            <Link to="https://linkedin.com/in/nwinsen">
              <HStack>
                <Text>
                  <FaLinkedin />
                </Text>
                <Text display={{ base: "none", md: "flex" }}>/in/nwinsen</Text>
              </HStack>
            </Link>
          </HStack>
          <Link to="http://github.com/nwinsen/portfolio">
            <HStack>
              <Text fontSize={"12px"} color={"#7f7f7f"}>
                <FaCodeBranch />
              </Text>
              <Text fontSize={"12px"} color={"#7f7f7f"}>
                Nicholas Winsen
              </Text>
            </HStack>
          </Link>
        </VStack>
      </Box>
    </>
  );
};

export default Footer;
