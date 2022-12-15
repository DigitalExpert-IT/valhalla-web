import React from 'react'
import dynamic from 'next/dynamic';
import { Box, Grid } from '@chakra-ui/react';
import { useWindowSize } from 'react-use';

export const Globes = () => {
  const size = useWindowSize();
  const Globe = dynamic(import("react-globe.gl"), { ssr: false });
  const N = [20, 30, 40, 22, 32, 42, 21, 31, 41, 43, 52, 64, 12, 36, 66, 29, 55];
  const arcsData = [...N].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
  }));

  const gRespont = () => {
    console.log(size.width)
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
        arcDashAnimateTime={() => Math.random() * 9000 + 5000}
        // arcCurveResolution={4000}
      />
    </Grid>
  )
}
