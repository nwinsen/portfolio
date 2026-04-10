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
import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const dp2 = p2.split("The Data Mine");
  const dp4 = p4.split("projects");
  const dp4_2 = dp4[1].split("résumé");

  const [discordState, setDiscordState] = useState("offline");

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "https://api.lanyard.rest/v1/users/211913127816593419",
          responseType: "json",
        });
        setDiscordState(res.data.data.discord_status);
      } catch (error) {
        console.error("Failed to fetch Discord status:", error);
      }
    };
    fetchDiscordStatus();
  }, []);
  return (
    <Box
      display="flex"
      margin="auto"
      paddingLeft={{ base: "16px", md: "120px" }}
      paddingRight={{ base: "16px", md: "120px" }}
      flex={"1 1 0%"}
    >
      <VStack
        width={"100%"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        marginTop={"80px"}
        marginBottom={"80px"}
        lineHeight={"34px"}
        minHeight={"100vh"}
      >
        <VStack
          display={{ base: "flex", md: "none" }}
          gap={"34px"}
          alignItems={"flex-start"}
        >
          <Box marginBottom={"20px"}>
            <Heading fontSize={"52px"} height={"81px"}>
              hey, i'm nick.
            </Heading>
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
                bg={{
                  _light: "rgba(229, 231, 235, 0.5)",
                  _dark: "#374151",
                }}
                borderRadius={"50%"}
                padding={"12px"}
              >
                <Link href="https://discordapp.com/users/211913127816593419">
                  <Text
                    color={{
                      _light: discordState === "online" ? "#16a34a" : "#525252",
                      _dark: discordState === "online" ? "#86efac" : "#9BA0A8",
                    }}
                  >
                    <FaDiscord />
                  </Text>
                </Link>
              </Box>
            </HStack>
          </Box>
        </VStack>
        <HStack
          display={{ base: "none", md: "flex" }}
          gap={"24px"}
          alignItems={"flex-start"}
        >
          <Heading
            fontSize={"51px"}
            paddingBottom={"55px"}
            whiteSpace={"nowrap"}
          >
            hey, i'm nick winsen.
          </Heading>
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
              Youngstown
            </Text>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"4px"}
            bg={{ _light: "rgba(229, 231, 235, 0.5)", _dark: "#374151" }}
            borderRadius={"50%"}
            padding={"12px"}
          >
            <Link href="https://discordapp.com/users/211913127816593419">
              <Text
                color={{
                  _light: discordState === "online" ? "#16a34a" : "#525252",
                  _dark: discordState === "online" ? "#86efac" : "#9BA0A8",
                }}
              >
                <FaDiscord />
              </Text>
            </Link>
          </Box>
          {discordState === "online" && (
            <Box
              position="relative"
              bg={{ _light: "#dcfce7", _dark: "#166534" }}
              border="2px solid"
              borderColor={{ _light: "#16a34a", _dark: "#86efac" }}
              borderRadius="16px"
              padding="2px 10px"
              fontSize="12px"
              fontWeight="bold"
              color={{ _light: "#16a34a", _dark: "#86efac" }}
              whiteSpace="nowrap"
              boxShadow={{
                _light: "1.5px 1.5px 0px #16a34a",
                _dark: "1.5px 1.5px 0px #86efac",
              }}
              _after={{
                content: '""',
                position: "absolute",
                left: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: "6px solid",
                borderRightColor: { _light: "#16a34a", _dark: "#86efac" },
              }}
              _before={{
                content: '""',
                position: "absolute",
                left: "-5px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderRight: "5px solid",
                borderRightColor: { _light: "#dcfce7", _dark: "#166534" },
                zIndex: 1,
              }}
            >
              I'm online!
            </Box>
          )}
        </HStack>
        <HStack width="100%" display="flex" justifyContent="space-between">
          <VStack alignItems={"flex-start"} gap={"1rem"} maxWidth={"720px"}>
            <Text fontSize={"20px"}>{p1}</Text>
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
                href="/resume.pdf"
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
