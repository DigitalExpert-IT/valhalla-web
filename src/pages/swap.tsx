import { Card, CardBody } from "@chakra-ui/react";
import { FormSwap, LayoutMain } from "components";

const Swap = () => {
  return (
    <LayoutMain>
      <Card
        variant="gradient"
        colorScheme="purple:pink"
        mx="auto"
        mt="12"
        py="8"
        px={{ base: "4", sm: "8" }}
        maxW="xl"
      >
        <CardBody>
          <FormSwap />
        </CardBody>
      </Card>
    </LayoutMain>
  );
};

export default Swap;
