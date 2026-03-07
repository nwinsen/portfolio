import { Heading, Text, Link, Code, Box, Image, List } from "@chakra-ui/react";
import type { Components } from "react-markdown";

const linkColor = { _light: "#157533", _dark: "#80b68a" };
const linkHover = { _light: "#0B3D0B", _dark: "#A3D9A5" };

export const MarkdownRenderers: Components = {
  h1: ({ children }) => (
    <Heading as="h1" size="2xl" mt="1.5rem" mb="0.75rem">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="xl" mt="1.25rem" mb="0.5rem">
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="lg" mt="1rem" mb="0.5rem">
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Text fontSize="18px" lineHeight="1.8" mb="1rem">
      {children}
    </Text>
  ),
  a: ({ href, children }) => (
    <Link
      href={href}
      color={linkColor}
      _hover={{ color: linkHover }}
      fontWeight="bold"
    >
      {children}
    </Link>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.startsWith("language-");
    if (isBlock) {
      return (
        <Box
          as="pre"
          overflowX="auto"
          p="1rem"
          borderRadius="md"
          bg={{ _light: "#f5f5f5", _dark: "#1e1e1e" }}
          mb="1rem"
          fontSize="14px"
          fontFamily="mono"
          lineHeight="1.6"
        >
          <code>{children}</code>
        </Box>
      );
    }
    return (
      <Code fontFamily="mono" fontSize="0.9em">
        {children}
      </Code>
    );
  },
  ul: ({ children }) => (
    <List.Root pl="1.5rem" mb="1rem">
      {children}
    </List.Root>
  ),
  ol: ({ children }) => (
    <List.Root as="ol" pl="1.5rem" mb="1rem">
      {children}
    </List.Root>
  ),
  li: ({ children }) => (
    <List.Item fontSize="18px" lineHeight="1.8">
      {children}
    </List.Item>
  ),
  blockquote: ({ children }) => (
    <Box
      as="blockquote"
      borderLeft="4px solid"
      borderColor={{ _light: "#157533", _dark: "#80b68a" }}
      pl="1rem"
      my="1rem"
      opacity={0.85}
    >
      {children}
    </Box>
  ),
  img: ({ src, alt }) => (
    <Image src={src} alt={alt} borderRadius="md" my="1rem" maxW="100%" />
  ),
  hr: () => (
    <Box
      as="hr"
      my="2rem"
      borderColor={{ _light: "#e2e2e2", _dark: "#444" }}
    />
  ),
  table: ({ children }) => (
    <Box overflowX="auto" mb="1rem">
      <Box as="table" width="100%" fontSize="16px">
        {children}
      </Box>
    </Box>
  ),
  th: ({ children }) => (
    <Box
      as="th"
      textAlign="left"
      p="0.5rem"
      fontWeight="bold"
      borderBottom="2px solid"
      borderColor={{ _light: "#e2e2e2", _dark: "#444" }}
    >
      {children}
    </Box>
  ),
  td: ({ children }) => (
    <Box
      as="td"
      p="0.5rem"
      borderBottom="1px solid"
      borderColor={{ _light: "#e2e2e2", _dark: "#444" }}
    >
      {children}
    </Box>
  ),
};
