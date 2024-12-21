import { Image, Text, Box, HStack, Link } from "@chakra-ui/react";

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
    <Box>
      <HStack
        display={"flex"}
        alignItems={"start"}
        position={"relative"}
        gap={"0px"}
      >
        <Box position={"relative"}>
          <Link href="https://drund.com">
            <Image src={img} alt={company} width={"55px"} height={"55px"} />
          </Link>
        </Box>
      </HStack>
      <Box id="box" width={"full"}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <Link>Company</Link>
          </HStack>
          <Text>
            {title}, {date}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default WorkItem;
