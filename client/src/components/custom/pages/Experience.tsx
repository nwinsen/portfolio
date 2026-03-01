import { Box, VStack, Heading } from "@chakra-ui/react";
import Work from "../smaller/Work";
import Projects from "../smaller/Projects";

const Experience = () => {
  return (
    <Box
      display="flex"
      margin="auto"
      paddingLeft={{ base: "16px", md: "120px" }}
      paddingRight={{ base: "16px", md: "120px" }}
      flex={"1 1 0%"}
      minHeight={"100vh"}
      width={"full"}
    >
      <VStack
        width={"full"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        marginTop={"80px"}
        marginBottom={"80px"}
        gap={20}
      >
        <VStack width={"full"} align={"flex-start"} gap={"12px"}>
          <Heading fontSize={"52px"} lineHeight={{ base: 1.33, md: 1.2 }}>
            work.
          </Heading>
          <Work />
        </VStack>

        <VStack width={"full"} align={"flex-start"} gap={"12px"}>
          <Heading
            fontSize={"52px"}
            lineHeight={{ base: 1.33, md: 1.2 }}
            id="projects"
          >
            projects.
          </Heading>
          <Projects />
        </VStack>
      </VStack>
    </Box>
  );
};

export default Experience;
