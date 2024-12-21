import { Box, Text, Link, VStack, List } from "@chakra-ui/react";
const Contact = () => {
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
        maxWidth={"600px"}
        gap={"16px"}
      >
        <Text fontSize={"20px"}>
          The best way to reach out to me is via email at{" "}
          <Link
            color={{ _light: "#157533", _dark: "#80b68a" }}
            _hover={{
              color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
            }}
            href="mailto:nicholasgwinsen@gmail.com"
          >
            <b>nicholasgwinsen@gmail.com</b>
          </Link>
          .
        </Text>
        <Text fontSize={"20px"}>
          You can also find me on{" "}
          <List.Root>
            <List.Item marginRight={"100px"}>
              <Link
                color={{ _light: "#333333", _dark: "#E5E7EB" }}
                _hover={{
                  color: { _light: "#1A202C", _dark: "#1A202C" },
                }}
                href="/"
              >
                LinkedIn
              </Link>
            </List.Item>
          </List.Root>
        </Text>
      </VStack>
    </Box>
  );
};

export default Contact;
