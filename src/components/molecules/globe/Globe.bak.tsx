import dynamic from "next/dynamic";
import React from "react";
// import Globe from "react-globe.gl";
const N = 1000;
const arcsData = [...Array(N).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: [
    ["#B43632", "#EEB649", "#CCD556"][Math.round(Math.random() * 3)],
    ["#B43632", "#EEB649", "#CCD556"][Math.round(Math.random() * 3)]
  ]
}));
export const GlobeTest = () => {
  // const Globe = dynamic(import("react-globe.gl"), { ssr: false });
  let Globe = () => null;
  if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;
  const globeElement = React.useRef();
  const [size, setSize] = React.useState([0, 0]);

  React.useEffect(() => {
    // Auto-rotate
    globeElement.current.controls().autoRotate = true;
    globeElement.current.controls().autoRotateSpeed = 2;
    globeElement.current.controls().enableZoom = false;
  }, []);

  React.useLayoutEffect(() => {
    setSize([window.innerWidth, window.innerHeight * 1.5]);
  }, []);

  return (
    <div
      className="App"
      style={{
        background: "#000010",
        position: "relative"
      }}
    >
      <div
        style={{
          transform: "translate(-30%, -15%)",
          pointerEvents: "none"
        }}
      >
        <Globe
          width={size[0]}
          height={size[1]}
          waitForGlobeReady={false}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          arcsData={arcsData}
          arcColor={"color"}
          arcDashLength={() => Math.random()}
          arcDashGap={() => Math.random()}
          arcStroke={0.05}
          animateIn={false}
          arcDashAnimateTime={10000}
          ref={globeElement}
          enablePointerInteraction={false}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100vh",
          padding: "80px",
          fontSize: "70px",
          color: "#fff",
          display: "flex",
          "align-items": "center"
        }}
      >
        Hello world (get it?)
      </div>
    </div>
  );
}
