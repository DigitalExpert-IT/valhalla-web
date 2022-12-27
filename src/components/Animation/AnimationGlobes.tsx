import React from "react";
import arcsData from "../../constant/globe/arcsData";
import places from "../../constant/globe/places";
import { Box } from "@chakra-ui/react";

interface IObject {
  autoRotate: boolean,
  autoRotateSpeed: number,
  enableZoom: boolean,
  enableRotate: boolean,
}

interface IControls {
  controls(): IObject
}

interface ICurrent {
  current: IControls | any
}

export const AnimationGlobes: React.FC = () => {
  let Globe: any = () => null;
  if (typeof window !== "undefined") Globe = require("react-globe.gl").default;
  const globeElement: ICurrent = React.useRef();


  React.useEffect(() => {
    // Auto-rotate
    if (globeElement.current) {
      globeElement.current.controls().autoRotate = true;
      globeElement.current.controls().autoRotateSpeed = 0.5;
      globeElement.current.controls().enableZoom = false;
      globeElement.current.controls().enableRotate = false;
    }
  }, []);

  return (
    <Box>
      <Globe
        ref={globeElement}
        width={1000}
        height={1000}
        // showGraticules={true}
        showAtmosphere={true}
        htmlTransitionDuration={100}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={"/globe/globe_dark.jpg"}

        arcsData={arcsData}
        arcColor={"color"}
        arcDashLength={() => 1}
        arcDashGap={() => 4}
        arcDashAnimateTime={() => Math.random() * 100 * 500}

        pointsData={places}
        pointLat="lat"
        pointLng="lng"
        pointRadius={0.2}
        pointAltitude={0.0005} //high
        pointColor="color"
      />
    </Box>
  )
}
