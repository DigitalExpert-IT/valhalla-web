import React, { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AspectRatio, AspectRatioProps, Box } from "@chakra-ui/react";

export interface LazyVideoProps extends AspectRatioProps {
  src?: string;
}

export const LazyVideo = (props: LazyVideoProps) => {
  const { src, ...rest } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [inViewRef, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (videoRef.current && src) {
      return inViewRef(videoRef.current);
    }
  }, [src]);

  useEffect(() => {
    if (videoRef.current && src) {
      if (inView && videoRef.current.paused) {
        videoRef.current.play();
      } else if (videoRef.current.played) {
        videoRef.current.pause();
      }
    }
  }, [inView, src]);

  return (
    <AspectRatio ratio={1} w="full" {...rest}>
      {src ? (
        <Box as="video" ref={videoRef as any} loop muted autoPlay>
          <source src={src} type="video/mp4" />
        </Box>
      ) : (
        <Box />
      )}
    </AspectRatio>
  );
};
