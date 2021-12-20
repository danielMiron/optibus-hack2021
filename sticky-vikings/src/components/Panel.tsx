import React from "react";
import Box from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

type step = any;
type Props = {
  steps: step[];
};

// <Box sx={{ backgroundColor: step.color, color: "white" }} key={i}>
// {step.short_name && step.short_name} {step.name}
// </Box>
//{steps.map((step)=> <Box> </Box>)}
export const Panel = ({ steps }: Props) => {
  return (
    <Box>
      <Timeline>
        {steps.map((step, i) => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot sx={{ backgroundColor: step.color }} />
              {i < steps.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{step.name}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
  //   return <Box>{JSON.stringify(steps)}</Box>;
};
