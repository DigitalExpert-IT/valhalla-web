import { Box } from "@chakra-ui/react";
import { useMe } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const edges = [{ id: "1-2", source: "1", target: "2", type: "step" }];

const nodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];
const Hierarchy = () => {
  const { data } = useMe();
  console.log(data);

  const router = useRouter();
  return (
    <Box h="100vh">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        {/* <Controls /> */}
      </ReactFlow>
    </Box>
  );
};

export default Hierarchy;
