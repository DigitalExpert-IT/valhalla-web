import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

const dashboard = () => {
  return (
    <Stack direction={"row"} w="full">
      <Box flex={1}>menu</Box>
      <Box flex={3}>
        <FormControl>
          <Input type="search" />
        </FormControl>
      </Box>
      <Box flex={1}>Account</Box>
    </Stack>
  );
};

export default dashboard;
