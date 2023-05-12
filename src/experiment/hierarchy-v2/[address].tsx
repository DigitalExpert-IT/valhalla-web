import { Box } from "@chakra-ui/react";
import { withConnection } from "hoc";
import { useMe } from "hooks";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const edgesinit = [
  { id: "1-2", source: "1", target: "2", type: "step" },
  { id: "2-3", source: "2", target: "3", type: "step" },
];

const nodesinit = [
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
  {
    id: "3",
    data: { label: "World" },
    position: { x: 100, y: 200 },
  },
];
const Hierarchy = () => {
  const { data } = useMe();

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesinit);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesinit);

  useEffect(() => {
    let x = 100;
    const collectedNode = data?.map((e, i) => {
      const match = data.filter(j => j.upline === e.address);
      if (match.length > 1) {
        x = x * 3;
      }
      return {
        id: e.address,
        data: { label: e.address },
        position: { x: x, y: i * 120 },
      };
    });
    if (!collectedNode) return;
    setNodes(collectedNode);
  }, [data]);

  useEffect(() => {
    const collectedData: {
      id: string;
      source: string;
      target: string;
      type: string;
      label: string;
    }[] = [];
    nodes?.map((e, i) => {
      data?.map((j, l) => {
        if (j.upline === e.data.label) {
          collectedData.push({
            id: `${j.address}-${j.upline}`,
            source: j.upline,
            target: j.address,
            type: "step",
            label: "bawahnya",
          });
        }
      });
    });
    setEdges(collectedData);
  }, [data, nodes]);

  const onConnect = useCallback(
    (params: any) => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  );

  const router = useRouter();
  return (
    <Box h='100vh'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  )
};

export default withConnection(Hierarchy);
