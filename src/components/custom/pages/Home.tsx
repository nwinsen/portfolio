import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Link,
} from "@chakra-ui/react";
import { FaLocationDot, FaDiscord } from "react-icons/fa6";
import { p1, p2, p3, p4 } from "../../../data/home";
const Home = () => {
  const dp1 = p1.split("Drund");
  const dp2 = p2.split("The Data Mine");
  const dp4 = p4.split("projects");
  const dp4_2 = dp4[1].split("résumé");

  return (
    <Box
      display="flex"
      margin="auto"
      paddingLeft={{ base: "16px", md: "80px" }}
      paddingRight={{ base: "16px", md: "80px" }}
      flex={"1 1 0%"}
    >
      <VStack
        width={"100%"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        marginTop={"80px"}
        marginBottom={"80px"}
        lineHeight={"24px"}
        minHeight={"100vh"}
      >
        <VStack
          display={{ base: "flex", md: "none" }}
          gap={"16px"}
          alignItems={"flex-start"}
        >
          <Heading fontSize={"36px"}>hey, i'm nick winsen.</Heading>
          <HStack display={"flex"} gap={4} alignItems={"center"}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"4px"}
              bg={{ _light: "rgba(229, 231, 235, 0.5)", _dark: "#374151" }}
              borderRadius={"20px"}
              padding={"2px 8px 2px 8px"}
            >
              <Text color={{ _light: "#525252", _dark: "#9BA0A8" }}>
                <FaLocationDot />
              </Text>
              <Text color={{ _light: "#525252", _dark: "#9BA0A8" }}>
                Youngstown, OH
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"4px"}
              bg={{ _light: "rgba(229, 231, 235, 0.5)", _dark: "#374151" }}
              borderRadius={"50%"}
              padding={"6px"}
            >
              <Text color={{ _light: "#525252", _dark: "#9BA0A8" }}>
                <FaDiscord />
              </Text>
            </Box>
          </HStack>
        </VStack>
        <HStack
          display={{ base: "none", md: "flex" }}
          gap={"16px"}
          alignItems={"flex-start"}
        >
          <Heading fontSize={"36px"}>hey, i'm nick winsen.</Heading>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"4px"}
            bg={{ _light: "rgba(229, 231, 235, 0.5)", _dark: "#374151" }}
            borderRadius={"20px"}
            padding={"2px 8px 2px 8px"}
          >
            <Text color={{ _light: "#525252", _dark: "#9BA0A8" }}>
              <FaLocationDot />
            </Text>
            <Text color={{ _light: "#525252", _dark: "#9BA0A8" }}>
              Youngstown, OH
            </Text>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"4px"}
            bg={{ _light: "rgba(229, 231, 235, 0.5)", _dark: "#374151" }}
            borderRadius={"50%"}
            padding={"6px"}
          >
            <Text color={{ _light: "#525252", _dark: "#9BA0A8" }}>
              <FaDiscord />
            </Text>
          </Box>
        </HStack>
        <HStack width="100%" display="flex" justifyContent="space-between">
          <VStack alignItems={"flex-start"} gap={"1rem"} maxWidth={"600px"}>
            <Text fontSize={"20px"}>
              {dp1[0]}
              <Link
                color={{ _light: "#157533", _dark: "#80b68a" }}
                _hover={{
                  color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
                }}
                className="bio-link"
                href="https://drund.com"
              >
                <b>Drund</b>
              </Link>
              {dp1[1]}
            </Text>
            <Text fontSize={"20px"}>
              {dp2[0]}
              <Link
                color={{ _light: "#157533", _dark: "#80b68a" }}
                _hover={{
                  color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
                }}
                className="bio-link"
                href="https://tdm.ysumathstat.org/"
              >
                <b>The Data Mine</b>
              </Link>
              {dp2[1]}
            </Text>
            <Text fontSize={"20px"}>{p3}</Text>
            <Text fontSize={"20px"}>
              {dp4[0]}
              <Link
                color={{ _light: "#157533", _dark: "#80b68a" }}
                _hover={{
                  color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
                }}
                href="/exp#projects"
              >
                <b>projects</b>
              </Link>
              {dp4_2[0]}
              <Link
                color={{ _light: "#157533", _dark: "#80b68a" }}
                _hover={{
                  color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
                }}
                className="bio-link"
                href="/resume"
              >
                <b>résumé</b>
              </Link>
              {dp4_2[1]}
            </Text>
          </VStack>
          <Image
            display={{ base: "none", xl: "block" }}
            height={"300px"}
            width={"300px"}
            src="https://avatars.githubusercontent.com/u/97001114?v=4"
            alt="Nick Winsen"
            borderRadius={"50%"}
            border={{
              _light: "4px solid #525252",
              _dark: "4px solid #9BA0A8",
            }}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Home;
