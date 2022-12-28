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
    <Container
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
  );
};
