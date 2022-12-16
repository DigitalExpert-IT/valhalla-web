import React from 'react'
import dynamic from 'next/dynamic';
import arcsData from "./data";
import places from "./places";
import { Box, Grid } from '@chakra-ui/react';
import { useWindowSize } from 'react-use';

export const Globes = () => {
  const size = useWindowSize();
  const Globe = dynamic(import("react-globe.gl"), { ssr: false });

  const gRespont = () => {
    if (size.width > 768) {
      return 500
    }
    return 200
  }

  return (
    <Grid 
      w={'full'} 
      mx={'auto'} 
      justifyItems={'center'}
    >
      <Globe
        width={gRespont()}
        height={gRespont()}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={"https://unpkg.com/three-globe@2.24.10/example/img/earth-night.jpg"}
        arcsData={arcsData}
        arcColor={'color'}
        arcDashLength={() => 1}
        arcDashGap={() => 4}
        arcDashAnimateTime={() => Math.random() * 400 + 500}
        // arcCurveResolution={4000}
        // labels
        // labelsData={places}
        // labelLat={(d) => d.lat}
        // labelLng={(d) => d.lng}
        // labelText={(d) => d.name}
        // labelSize={(d) => 0.5 + d.size}
        // labelDotRadius={(d) => 0.5 + d.size}
        // labelColor={() => "rgba(255, 165, 0, 0.75)"}
        // labelResolution={2}
        // bars
        hexBinPointsData={places}
        hexBinPointWeight="size"
        hexAltitude={(d) => d.sumWeight - 0.1 + 0.05}
        hexBinResolution={4}
        hexBinMerge={true}
        enablePointerInteraction={false}
      />
    </Grid>
  )
}
