import { Heading, Container, Box, Text, Image } from "@chakra-ui/react";

type Props = {
  illustrationUri: string;
  title: string;
  description: string;
  children?: JSX.Element | null;
};

export const LayoutIllustration = (props: Props) => {
  const { illustrationUri, title, description, children } = props;
  return (
    <Box
      bgGradient="linear-gradient(180deg, #2C1FA7 0%, #6D02C9 100%)"
      pos="relative"
      display="flex"
    >
      <Image
        src="/images/bgHeader_home.png"
        alt="background"
        pos="absolute"
        zIndex={1}
        objectFit="cover"
        h="100vh"
      />
      <Container
        zIndex={1000}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxW="3xl"
        h="100vh"
      >
        <Image mb="6" w="64" src={illustrationUri} alt={title} />
        <Box textAlign="center">
          <Heading>{title}</Heading>
          <Text>{description}</Text>
          {children}
        </Box>
      </Container>
    </Box>
  );
};
