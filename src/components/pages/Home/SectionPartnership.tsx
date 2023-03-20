import React from "react";
import { Card, Wrap, WrapItem, Image, Box, Stack } from "@chakra-ui/react";

interface IPartnership {
  name: string;
  image: string;
}

interface SectionPartnershipProps {
  data: IPartnership[];
}

export const SectionPartnership: React.FC<SectionPartnershipProps> = props => {
  return (
    <Stack>
      <Wrap spacing="5" justify="center">
        {props.data.map((item, idx) => (
          <WrapItem key={idx}>
            <Box maxW="4xs">
              <Image
                src={item.image}
                alt={`partner-${item.name}`}
                objectFit="cover"
              />
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
};
