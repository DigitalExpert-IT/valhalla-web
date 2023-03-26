import { Box, Button, ButtonProps, Stack } from "@chakra-ui/react";

interface UglyButtonProps extends ButtonProps {
  price: string;
  label: string;
}
export const UglyButton: React.FC<UglyButtonProps> = props => {
  const { price, label, ...rest } = props;
  return (
    <Box
      bgGradient="linear(to-r, #FF00FF, blue.500)"
      rounded="lg"
      w="full"
      p="1px"
    >
      <Stack
        direction="row"
        spacing={"0"}
        w="full"
        justifyContent="space-between"
        rounded="lg"
        bg="#191272"
      >
        <Box
          flex={1}
          borderRight="1px solid #FF00FF"
          alignItems="center"
          display="flex"
          justifyContent="center"
          rounded="lg"
        >
          {price}
        </Box>
        <Button
          rounded="none"
          flex={1}
          padding="0"
          bg="transparent"
          onClick={props.onClick}
          {...rest}
        >
          {label}
        </Button>
      </Stack>
    </Box>
  );
};
