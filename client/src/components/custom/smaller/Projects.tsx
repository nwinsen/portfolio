import { Text, VStack } from "@chakra-ui/react";
import Project from "./Project";
import { MyProjects } from "../../../data/projects";

const projects = MyProjects;
export interface LinkType {
  title: string;
  url: string;
}

const Projects = () => {
  return (
    <VStack width={"full"} gap={4} align={"flex-start"}>
      <Text color={{ _light: "gray.500", _dark: "gray.400" }}>
        A collection of projects I've worked on:
      </Text>
      {projects.map((project) => {
        return (
          <Project
            key={project.title}
            title={project.title}
            img={project.img}
            subtitle={project.subtitle}
            description={project.description}
            links={project.links}
          />
        );
      })}
    </VStack>
  );
};

export default Projects;
