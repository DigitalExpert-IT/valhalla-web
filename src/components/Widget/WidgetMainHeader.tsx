import { Flex, FlexProps, Box } from "@chakra-ui/react";
import { Image2x2, Image2x2Props } from "components";

type Props = FlexProps & {
  imageData: Image2x2Props["data"];
};

export const WidgetMainHeader = (props: Props) => {
  const { imageData, children, ...rest } = props;
  return (
    <Flex w="full" {...rest}>
      <Box flex="1" alignItems="center" display={{ base: "none", lg: "flex" }}>
        <Box w="full">
          <Image2x2 data={imageData} />
        </Box>
      </Box>
      <Box flex="1.5">{children}</Box>
    </Flex>
  );
};
