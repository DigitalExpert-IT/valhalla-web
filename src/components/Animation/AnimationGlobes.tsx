import React, { MutableRefObject } from "react";
import arcsData from "../../constant/globe/arcsData";
import places from "../../constant/globe/places";
import { Box } from "@chakra-ui/react";

interface IGlobeEl {
  camera: () => void,
  controls: () => void,
  getCoords: () => void,
  getGlobeRadius: () => void,
  Coords: () => void,
  pauseAnimation: () => void,
  pointOfView: () => void,
  postProcessingComposer: () => void,
  renderer: () => void,
  resumeAnimation: () => void,
  scene: () => void,
  toGeoCoords: () => void,
  toGlobeCoords: () => void,
}

interface IObject {
  autoRotate: boolean,
  autoRotateSpeed: number,
  enableZoom: boolean
}

interface IControls {
  controls(): IObject
}

// interface IClobeAnimation {
//   current: IControls
// }

// interface MyComponentProps {
//   ref: MutableRefObject<IControls | undefined>;
//   // ref: () => null;
// }

export const AnimationGlobes: React.FC = () => {
  let Globe: any = () => null;
  if (typeof window !== "undefined") Globe = require("react-globe.gl").default;
  const globeElement = React.useRef<IControls | undefined>();
  const [size, setSize] = React.useState([0, 0]);

  React.useEffect(() => {
    // Auto-rotate
    if (globeElement.current) {
      globeElement.current.controls().autoRotate = true;
      globeElement.current.controls().autoRotateSpeed = 0.5;
      globeElement.current.controls().enableZoom = false;
    }
  }, []);

  React.useLayoutEffect(() => {
    setSize([window.innerWidth, window.innerHeight * 1.5]);
  }, []);
  console.log(globeElement);


  return (
    <Box position={"absolute"} right={-100} top={0} zIndex={1}>
      <Globe
        ref={globeElement}
        width={1000}
        height={1000}
        // showGraticules={true}
        showAtmosphere={true}
        htmlTransitionDuration={100}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={"/globe/globe_dark3.jpg"}

        arcsData={arcsData}
        arcColor={'color'}
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
