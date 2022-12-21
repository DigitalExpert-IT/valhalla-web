import React from 'react'
import dynamic from 'next/dynamic';
import arcsData from "./data";
import places from "./places";
import { Box, Grid } from '@chakra-ui/react';
import { useWindowSize } from 'react-use';
import globeImg from './globe_dark3.jpg'

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
        width={500}
        height={500}
        showGraticules={true}
        htmlTransitionDuration={100}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={globeImg.src}
        arcsData={arcsData}
        arcColor={'color'}
        arcDashLength={() => 1}
        arcDashGap={() => 4}
        arcDashAnimateTime={() => Math.random() * 300 * 500}
        // labels
        // labelsData={places}
        // labelLat="lat"
        // labelLng="lng"
        // labelText="name"
        // labelSize="size"
        // labelDotRadius={(d:any) => 0.5 + d.size}
        // labelColor={() => "rgba(255, 165, 0, 0.75)"}
        // labelResolution={2}
        // bars
        // hexBinPointsData={places}
        // hexBinPointWeight="size"
        // hexAltitude={(d) => d.sumWeight - 0.1 + 0.05}
        // hexBinResolution={4}
        // hexBinMerge={true}
        // enablePointerInteraction={false}

        pointsData={places}
        pointLat="lat"
        pointLng="lng"
        pointRadius={0.2}
        pointAltitude={0.0005} //high
        pointColor="color"
      />
    </Grid>
  )
}
