import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Box, VStack, Heading, Text, Link, HStack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogBySlug } from "../../../data/blog";
import { MarkdownRenderers } from "../smaller/MarkdownRenderers";

const API_URL = import.meta.env.VITE_API_URL;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!slug || !API_URL) return;
    console.log(API_URL);
    fetch(`${API_URL}/blog/${slug}`, { method: "PATCH" })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.views === "number") setViews(data.views);
      })
      .catch(() => {});
  }, [slug]);

  if (!post) {
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
          minHeight="100vh"
          gap="16px"
        >
          <Heading>Post not found</Heading>
          <Link
            href="/blog"
            color={{ _light: "#157533", _dark: "#80b68a" }}
            _hover={{ color: { _light: "#0B3D0B", _dark: "#A3D9A5" } }}
            fontWeight="bold"
          >
            Back to all posts
          </Link>
        </VStack>
      </Box>
    );
  }

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
        minHeight="100vh"
        maxWidth="720px"
        gap="8px"
      >
        <Link
          href="/blog"
          color={{ _light: "#525252", _dark: "#9BA0A8" }}
          _hover={{ color: { _light: "#157533", _dark: "#80b68a" } }}
          fontSize="14px"
          mb="24px"
        >
          &larr; All posts
        </Link>

        <Heading size="3xl">{post.frontmatter.title}</Heading>

        <HStack gap="12px" alignItems="center">
          <Text fontSize="14px" color={{ _light: "#525252", _dark: "#9BA0A8" }}>
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          {views !== null && (
            <Text
              fontSize="14px"
              color={{ _light: "#525252", _dark: "#9BA0A8" }}
            >
              &middot; {views} views
            </Text>
          )}
        </HStack>

        {post.frontmatter.tags.length > 0 && (
          <HStack gap="8px" flexWrap="wrap" mt="4px">
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
                  color={{ _light: "#525252", _dark: "#9BA0A8" }}
                >
                  {tag}
                </Text>
              </Box>
            ))}
          </HStack>
        )}

        <Box
          width="100%"
          height="1px"
          bg={{ _light: "#e2e2e2", _dark: "#333" }}
          mt="24px"
          mb="16px"
        />

        <Box width="100%">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownRenderers}
          >
            {post.content}
          </ReactMarkdown>
        </Box>

        <Box
          width="100%"
          height="1px"
          bg={{ _light: "#e2e2e2", _dark: "#333" }}
          mt="32px"
          mb="8px"
        />

        <Link
          href="/blog"
          color={{ _light: "#157533", _dark: "#80b68a" }}
          _hover={{ color: { _light: "#0B3D0B", _dark: "#A3D9A5" } }}
          fontWeight="bold"
        >
          &larr; Back to all posts
        </Link>
      </VStack>
    </Box>
  );
};

export default BlogPost;
