import { Box, Text, Link, VStack, Heading, List } from "@chakra-ui/react";

const Contact = () => {
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
        maxWidth={"720px"}
        gap={"1rem"}
      >
        <Heading
          fontSize={"52px"}
          lineHeight={{ base: 1.33, md: 1.2 }}
          marginBottom={"20px"}
        >
          get in touch with me.
        </Heading>
        <Text fontSize={"20px"}>
          The best way to reach out is via email at{" "}
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
        <Text fontSize={"20px"}>You can also find me on:</Text>
        <List.Root paddingLeft={"8px"}>
          <List.Item>
            <Link
              color={{ _light: "#157533", _dark: "#80b68a" }}
              _hover={{
                color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
              }}
              href="https://linkedin.com/in/nwinsen"
            >
              <b>LinkedIn</b>
            </Link>
          </List.Item>
          <List.Item>
            <Link
              color={{ _light: "#157533", _dark: "#80b68a" }}
              _hover={{
                color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
              }}
              href="https://discordapp.com/users/211913127816593419"
            >
              <b>Discord</b>
            </Link>
          </List.Item>
        </List.Root>
      </VStack>
    </Box>
  );
};

export default Contact;
