import { Box, Heading, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
const Home = () => {
  return (
    <Box
      as="nav"
      display="flex"
      margin="auto"
      paddingLeft={{ base: "16px", md: "80px" }}
      paddingRight={{ base: "16px", md: "80px" }}
    >
      <HStack alignItems={"center"}>
        <VStack
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          marginTop={"80px"}
          marginBottom={"80px"}
          lineHeight={"24px"}
          maxWidth={"600px"}
        >
          <HStack marginBottom={"16px"}>
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
          </HStack>
          <Text fontSize={"20px"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod amet
            totam iure facere rem architecto repellat ullam, aliquid praesentium
            velit nostrum accusantium voluptatem error dicta doloribus ipsum hic
            saepe sapiente!
          </Text>
          <Text fontSize={"20px"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
            ullam consequuntur eos modi soluta vel quis. Veniam architecto unde
            aspernatur veritatis ipsa doloribus officiis rerum, blanditiis
            beatae nihil incidunt commodi.
          </Text>
          <Text fontSize={"20px"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            praesentium hic itaque suscipit est laudantium exercitationem rem
            maxime sapiente delectus harum vel quos, quo temporibus? Culpa
            consequuntur dignissimos doloribus similique.
          </Text>
        </VStack>
        <Box
          display={{ base: "none", md: "block" }}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          marginTop={"80px"}
          marginBottom={"80px"}
        >
          <Image
            src="https://avatars.githubusercontent.com/u/97001114?v=4"
            alt="Nick Winsen"
            borderRadius={"50%"}
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default Home;
