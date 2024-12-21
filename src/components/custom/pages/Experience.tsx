import { Box, VStack, Heading } from "@chakra-ui/react";
import Work from "../modular/Work";
import Projects from "../modular/Projects";

const Experience = () => {
  return (
    <Box
      display="flex"
      margin="auto"
      paddingLeft={{ base: "16px", md: "80px" }}
      paddingRight={{ base: "16px", md: "80px" }}
      flex={"1 1 0%"}
      minHeight={"100vh"}
    >
      <VStack
        width={"100%"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Heading fontSize={"48px"} lineHeight={{ base: 1.33, md: 1.2 }}>
          Work
        </Heading>
        <Work />
        <Heading
          fontSize={"48px"}
          lineHeight={{ base: 1.33, md: 1.2 }}
          id="projects"
        >
          Projects
        </Heading>
        <Projects />
      </VStack>
    </Box>
  );
};

export default Experience;
