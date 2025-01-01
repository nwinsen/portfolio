import {
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Link,
  Box,
} from "@chakra-ui/react";
import { ProjectImage } from "../../../data/projects";
import { LinkType } from "./Projects";
interface ProjectProps {
  title: string;
  img: ProjectImage;
  subtitle: string;
  description: string;
  links: LinkType[];
}

const Project = ({
  title,
  img,
  subtitle,
  description,
  links,
}: ProjectProps) => {
  return (
    <Box width={"full"} className="project">
      <Image
        src={img.src}
        width={"full"}
        borderRadius={"xl"}
        maxHeight={"150px"}
        objectFit={"cover"}
        objectPosition={`0% ${img.pos}%`}
        marginBottom={2}
      />
      <VStack gap={0} align={"flex-start"}>
        <Heading>{title}</Heading>
        <Text color={"gray.500"}>{subtitle}</Text>
        <Text>{description}</Text>
      </VStack>
      <HStack>
        {links.map((link) => (
          <Link
            color={{ _light: "#157533", _dark: "#80b68a" }}
            _hover={{
              color: { _light: "#0B3D0B", _dark: "#A3D9A5" },
            }}
            href={link.url}
            fontWeight={"bold"}
          >
            {link.title}
          </Link>
        ))}
      </HStack>
    </Box>
  );
};

export default Project;
