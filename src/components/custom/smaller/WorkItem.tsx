import { Image, Text, Box, HStack, Link, VStack } from "@chakra-ui/react";

interface WorkItemProps {
  company: string;
  title: string;
  description: string;
  date: string;
  img: string;
}

const WorkItem = ({
  company,
  title,
  description,
  date,
  img,
}: WorkItemProps) => {
  return (
    <>
      <Box display={{ base: "none", md: "flex" }} width={"full"}>
        <VStack width={"full"} alignItems={"flex-start"}>
          <Image
            position="absolute"
            left={8}
            marginLeft={4}
            marginTop={2}
            src={img}
            height={"55px"}
            width={"55px"}
            objectFit="contain"
          />
          <HStack width={"full"} justifyContent={"space-between"}>
            <HStack>
              <Link
                color={{ _light: "#157533", _dark: "#80b68a" }}
                _hover={{
                  color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
                }}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {company}
              </Link>
            </HStack>
            <Text>
              {title}, {date}
            </Text>
          </HStack>
          <Text color={{ _light: "gray.500", _dark: "gray.400" }}>
            {description}
          </Text>
        </VStack>
      </Box>
      <Box display={{ base: "flex", md: "none" }} width={"full"}>
        <VStack alignItems={"flex-start"}>
          <VStack
            width={"full"}
            align={"flex-start"}
            justifyContent={"space-between"}
          >
            <HStack>
              <Image
                src={img}
                height={"35px"}
                width={"35px"}
                objectFit="contain"
              />
              <Link fontSize={"4xl"} fontWeight={"bold"}>
                {company}
              </Link>
            </HStack>
            <Text>
              {title}, {date}
            </Text>
          </VStack>
          <Text color={{ _light: "gray.500", _dark: "gray.400" }}>
            {description}
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default WorkItem;
