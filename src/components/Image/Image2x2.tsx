import {
  Grid,
  GridItem,
  AspectRatio,
  Image,
  Box,
  Text,
  GridProps,
} from "@chakra-ui/react";

type ImageData = {
  uri: string;
  alt: string;
};

export type Image2x2Props = GridProps & {
  data: ImageData[];
};

export const Image2x2 = (props: Image2x2Props) => {
  const { data, children, ...rest } = props;
  return (
    <Grid
      w="full"
      borderWidth="thick"
      borderColor="purple.500"
      borderStyle="solid"
      borderRadius="lg"
      bg="purple.500"
      {...rest}
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(2, 1fr)"
    >
      {data.map((item, idx) => (
        <GridItem
          overflow="hidden"
          borderWidth="thick"
          borderColor="purple.500"
          borderStyle="solid"
          key={idx}
        >
          <AspectRatio
            overflow="hidden"
            borderTopLeftRadius={idx === 0 ? "lg" : undefined}
            borderTopRightRadius={idx === 1 ? "lg" : undefined}
            borderBottomLeftRadius={idx === 2 ? "lg" : undefined}
            borderBottomRightRadius={idx === 3 ? "lg" : undefined}
            w="full"
            ratio={1.2 / 1}
          >
            <Box position="relative">
              <Box
                py="3"
                overflow="hidden"
                position="absolute"
                w="full"
                bg="blackAlpha.400"
                backdropFilter="blur(6px)"
                bottom="0"
                left="0"
              >
                <Text
                  position="relative"
                  zIndex={3}
                  fontWeight="bold"
                  textTransform="uppercase"
                  textAlign="center"
                >
                  {item.alt}
                </Text>
              </Box>
              <Image objectFit="cover" src={item.uri} alt={item.alt} />
            </Box>
          </AspectRatio>
        </GridItem>
      ))}
    </Grid>
  );
};
