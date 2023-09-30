import React, { useRef, useEffect, useMemo } from "react";
import { renderToString } from "react-dom/server";
import { Box, BoxProps, IconButton, Stack } from "@chakra-ui/react";
import {
  BsArrowsCollapse,
  BsFullscreen,
  BsZoomIn,
  BsZoomOut,
} from "react-icons/bs";
import { CgArrowsExpandRight } from "react-icons/cg";
import { OrgChart as D3OrgChart, Connection } from "d3-org-chart";
import { useQuery } from "@tanstack/react-query";

type Props = BoxProps & {
  address: string;
};

const orgChart = new D3OrgChart();
orgChart
  .nodeHeight(() => 85)
  .nodeWidth(() => 430)
  .childrenMargin(() => 50)
  .compactMarginBetween(() => 25)
  .compactMarginPair(() => 50)
  .neightbourMargin(() => 25)
  .siblingsMargin(() => 25)
  .buttonContent(({ node }: Connection) => {
    return `<div style="color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
      node.children
        ? `<i class="fas fa-angle-up"></i>`
        : `<i class="fas fa-angle-down"></i>`
    }</span> ${node.data._directSubordinates}  </div>`;
  })
  .nodeContent(function (d: Connection) {
    return renderToString(<NodeContent address={d.data.address} />);
  });

export const OrgChart = (props: Props) => {
  const { address, children, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const hierarchy = useQuery({ queryKey: [`/address/${address}`] });

  const data = useMemo(() => {
    return ((hierarchy.data ?? []) as any[]).map(item => ({
      id: item.address,
      parentId: item.upline,
      address: item.address,
    }));
  }, [hierarchy.data]);

  useEffect(() => {
    if (!containerRef.current) return;
    orgChart
      .container(containerRef.current as any)
      .svgHeight(containerRef.current!.clientHeight)
      .svgWidth(containerRef.current!.clientWidth)
      .data(data)
      .render();
  }, [data]);

  return (
    <Box position="relative" overflow="hidden">
      <Stack position="absolute" bottom="6" right="6">
        <IconButton
          onClick={() => orgChart.fullscreen.bind(orgChart)()}
          aria-label="center"
          icon={<BsFullscreen />}
        />
        <IconButton
          onClick={orgChart.expandAll.bind(orgChart)}
          aria-label="expand all"
          icon={<CgArrowsExpandRight />}
        />
        <IconButton
          onClick={orgChart.collapseAll.bind(orgChart)}
          aria-label="collapse all"
          icon={<BsArrowsCollapse />}
        />
        <IconButton
          onClick={orgChart.zoomIn.bind(orgChart)}
          aria-label="zoom in"
          icon={<BsZoomIn />}
        />
        <IconButton
          onClick={orgChart.zoomOut.bind(orgChart)}
          aria-label="zoom out"
          icon={<BsZoomOut />}
        />
      </Stack>
      <Box ref={containerRef} {...rest} />
    </Box>
  );
};

const NodeContent = (props: { address: string }) => {
  const { address } = props;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        textAlign: "center",
        paddingTop: "25px",
        paddingBottom: "25px",
        borderRadius: "20px",
      }}
    >
      <p
        style={{
          color: "#000000",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {address}
      </p>
    </div>
  );
};
