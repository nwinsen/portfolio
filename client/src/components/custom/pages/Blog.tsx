import { Box, Text, Link, VStack, List, Heading } from "@chakra-ui/react";
const Blog = () => {
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
        maxWidth={"600px"}
        gap={"16px"}
      >
        <Heading>Blog</Heading>
        <Text fontSize={"20px"}>
          You can also find me on{" "}
          <List.Root>
            <List.Item marginRight={"100px"}>
              <Link
                color={{ _light: "#157533", _dark: "#80b68a" }}
                _hover={{
                  color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
                }}
                className="bio-link"
                href="https://linkedin.com/in/nwinsen"
              >
                <b>LinkedIn</b>
              </Link>
            </List.Item>
            <List.Item marginRight={"100px"}>
              <Link
                color={{ _light: "#157533", _dark: "#80b68a" }}
                _hover={{
                  color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
                }}
                className="bio-link"
                href="https://discordapp.com/users/211913127816593419"
              >
                <b>Discord</b>
              </Link>
            </List.Item>
          </List.Root>
        </Text>
      </VStack>
    </Box>
  );
};
export default Blog;
