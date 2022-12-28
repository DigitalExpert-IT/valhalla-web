import { Spinner } from "@chakra-ui/react";

export const LayoutLoading = () => {
  return (
    <Spinner
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      size="xl"
    />
  );
};
