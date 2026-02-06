import { VStack } from "@chakra-ui/react";
import WorkItem from "./WorkItem";
import { MyWork } from "../../../data/work";
const jobs = MyWork;
const Work = () => {
  return (
    <VStack width={"full"} align={"flex-start"} gap={8}>
      {jobs.map((job) => {
        return (
          <WorkItem
            key={job.title}
            company={job.company}
            title={job.title}
            date={job.date}
            img={job.img}
            description={job.description}
          />
        );
      })}
    </VStack>
  );
};

export default Work;
