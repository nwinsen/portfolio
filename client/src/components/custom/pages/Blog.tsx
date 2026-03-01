import { Box, Text, VStack, Heading, Link, HStack } from "@chakra-ui/react";
import { blogPosts } from "../../../data/blog";

const Blog = () => {
  return (
    <Box
      display="flex"
      margin="auto"
      paddingLeft={{ base: "16px", md: "120px" }}
      paddingRight={{ base: "16px", md: "120px" }}
      flex="1 1 0%"
    >
      <VStack
        width="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        marginTop="80px"
        marginBottom="80px"
        lineHeight="34px"
        minHeight="100vh"
        maxWidth="720px"
        gap="16px"
      >
        <Heading fontSize="52px" lineHeight={{ base: 1.33, md: 1.2 }}>
          blog.
        </Heading>
        {blogPosts.length === 0 ? (
          <Text fontSize="20px">No posts yet.</Text>
        ) : (
          <VStack width="100%" gap="24px" mt="8px">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                width="100%"
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  width="100%"
                  p="1.25rem"
                  borderRadius="md"
                  border="1px solid"
                  borderColor={{ _light: "#e2e2e2", _dark: "#333" }}
                  _hover={{
                    borderColor: { _light: "#157533", _dark: "#80b68a" },
                  }}
                  transition="border-color 0.2s"
                >
                  <Heading size="lg" mb="6px">
                    {post.frontmatter.title}
                  </Heading>
                  <Text
                    fontSize="14px"
                    color={{ _light: "#525252", _dark: "#9BA0A8" }}
                    mb="10px"
                  >
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </Text>
                  <Text
                    fontSize="16px"
                    color={{ _light: "#525252", _dark: "#9BA0A8" }}
                    mb="12px"
                    lineHeight="1.6"
                  >
                    {post.frontmatter.description}
                  </Text>
                  {post.frontmatter.tags.length > 0 && (
                    <HStack gap="8px" flexWrap="wrap">
                      {post.frontmatter.tags.map((tag) => (
                        <Box
                          key={tag}
                          display="flex"
                          alignItems="center"
                          bg={{
                            _light: "rgba(229, 231, 235, 0.5)",
                            _dark: "#374151",
                          }}
                          borderRadius="20px"
                          padding="2px 10px"
                        >
                          <Text
                            fontSize="13px"
                            color={{
                              _light: "#525252",
                              _dark: "#9BA0A8",
                            }}
                          >
                            {tag}
                          </Text>
                        </Box>
                      ))}
                    </HStack>
                  )}
                </Box>
              </Link>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default Blog;
