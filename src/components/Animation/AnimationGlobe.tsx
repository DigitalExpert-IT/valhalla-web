import { useEffect, useRef } from "react";
import { ARGS_DATA, POINTS_DATA } from "constant/globe";
import { Box, BoxProps } from "@chakra-ui/react";
import { GlobeInstance } from "globe.gl";

let globe = {} as GlobeInstance;

type Props = BoxProps;

export const AnimationGlobe: React.FC = (props: Props) => {
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const init = async () => {
      if (!boxRef.current) return;
      const Globe = (await import("globe.gl")).default;
      globe = Globe();

      globe(boxRef.current)
        .globeImageUrl("/globe/globe_dark.jpg")
        .pointsData(POINTS_DATA)
        .arcsData(ARGS_DATA)
        .pointsMerge(true)
        .hexBinMerge(true)
        .width(boxRef.current.clientWidth)
        .height(boxRef.current.clientHeight)
        .backgroundColor("rgba(0, 0, 0, 0)")
        .showAtmosphere(true)
        .htmlTransitionDuration(100)
        .arcColor("color")
        .arcDashLength(1)
        .arcDashGap(4)
        .arcDashAnimateTime(() => Math.random() * 100 * 200)
        .pointLat("lat")
        .pointLng("lng")
        .pointRadius(0.2)
        .pointAltitude(0.0005)
        .pointColor("color");

      const resizeObserver = new ResizeObserver(() => {
        if (!boxRef.current) return;
        globe.height(boxRef.current.clientHeight);
        globe.width(boxRef.current.clientWidth);
      });

      resizeObserver.observe(boxRef.current);

      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = -2;
      controls.enableZoom = false;
    };

    init();

    return () => {
      globe._destructor && globe._destructor();
    };
  });

  return <Box ref={boxRef} overflow="hidden" w="full" {...props} />;
};
