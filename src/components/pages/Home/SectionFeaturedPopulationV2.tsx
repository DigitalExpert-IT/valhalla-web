import {
  Box,
  Heading,
  Text,
  Container,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { Trans } from "react-i18next";

export const SectionFeaturedPopulationV2 = () => {
  const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
  return (
    <Box
      bgGradient="linear-gradient(180deg, #191272 0%, #2C1FA7 100%)"
      h={isLargerThan2000 ? "60vh" : { base: "70vh", md: "100vh" }}
      mt={{ base: 10, md: 40 }}
      display="flex"
      alignItems="center"
      position="relative"
      overflow={{ base: "hidden", lg: "visible" }}
    >
      <Image
        opacity={{ base: "0.3", lg: "1" }}
        src="assets/global-decentralize/globe.png"
        alt="globe"
        position="absolute"
        top="0"
        transform={
          isLargerThan2000
            ? "scale(0.8) translateX(350px) translateY(2rem)"
            : {
                base: "scale(1.3) translateX(0) translateY(80px)",
                xs: "scale(0.9) translateX(0) translateY(50px)",
                md: "scale(0.9) translateX(-150px) translateY(0)",
              }
        }
        zIndex="1"
      />
      <Image
        opacity={{ base: "0.3", lg: "1" }}
        src="assets/global-decentralize/globe-support.png"
        alt="globe-support"
        position="absolute"
        top="0"
        transform={
          isLargerThan2000
            ? "scale(0.8) translateX(300px) translateY(-50px)"
            : {
                base: "scale(1.3) translateX(0) translateY(80px)",
                xs: "scale(0.9) translateX(-10px) translateY(30px)",
                md: "scale(0.9) translateX(-200px) translateY(-50px)",
              }
        }
        zIndex="2"
      />
      <Box
        opacity={{ base: "0.3", lg: "1" }}
        top="0"
        position="absolute"
        w={{ base: "50px", lg: "80px" }}
        h={{ base: "50px", lg: "80px" }}
        rounded="full"
        bg="radial-gradient(38.6% 38.67% at 50.4% 47.9%, #EBEBEB 0%, #C5C5C5 14%, #A2A2A2 24%, #636363 39%, #3D3D3D 55%, #2B2B2B 65%, #1F1F1F 75%, #0C0C0C 87%, #000000 100%)"
        backgroundBlendMode="color-dodge"
        mixBlendMode="color-dodge"
        transform={
          isLargerThan2000
            ? "matrix(0.8, -0.6, 0.6, 0.8, 0, 0) translateX(34rem) translateY(45rem) scale(10.5)"
            : {
                base: "matrix(0.8, -0.6, 0.6, 0.8, 0, 0) translateX(5rem) translateY(15rem) scale(10.5)",
                xs: "matrix(0.8, -0.6, 0.6, 0.8, 0, 0) translateX(10rem) translateY(23rem) scale(10.5)",
                md: "matrix(0.8, -0.6, 0.6, 0.8, 0, 0) translateX(10rem) translateY(25rem) scale(10.5)",
              }
        }
        zIndex="0"
      />

      <Container maxW="container.xl" overflowX="hidden" zIndex={"9"}>
        <Box
          w={{ lg: "60%", base: "100%" }}
          float="right"
          textAlign={{ base: "center", lg: "left" }}
        >
          <Heading
            mb="6"
            size={{ base: "lg", md: "4xl" }}
            lineHeight="101%"
            fontWeight="extrabold"
          >
            <Trans
              i18nKey="pages.home.populationSection.title"
              components={{
                strong: (
                  <Text
                    as="span"
                    style={{
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    fontWeight="bold"
                    bgClip="text"
                    bgGradient="linear-gradient(90deg, #9C29FF 0%, #FFFFFF 100%)"
                    _after={{
                      content: "''",
                      display: "block",
                    }}
                  />
                ),
              }}
            />
          </Heading>
          <Text fontSize={{ base: "md", md: "2xl" }} maxW={"4xl"}>
            <Trans
              i18nKey="pages.home.populationSection.content"
              components={{
                strong: <Text as="span" fontWeight="bold" color="#FF00FF" />,
              }}
            />
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
