import React from "react";
import { Box, Text, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import Image from "next/image";

export interface IDataItem {
  key: string;
  text: string;
  value: string | number;
  icon: string;
  unit: string;
}

interface ISummaryProps {
  data: IDataItem[];
}

export const SummaryDashboardV2: React.FC<ISummaryProps> = props => {
  return (
    <Wrap justify="center" spacing="2rem">
      {props.data.map(item => (
        <WrapItem key={item.key}>
          <Box
            width="250px"
            height="291px"
            rounded="xl"
            bgGradient="linear-gradient(131deg, #7C75E8 0%, #A063F9 100%)"
          >
            <Stack
              w="full"
              align="center"
              rounded="xl"
              h="80%"
              justify="center"
              bg="#1C1F36"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                w="full"
                h="full"
                zIndex="0"
                bg="radial-gradient(50% 50.00% at 20% 40%, #684545 0%, #381F7B00 60%);"
              />
              <Box zIndex="1" textAlign="center">
                <Image
                  src={item.icon}
                  alt="icon-profit"
                  width={130}
                  height={130}
                />
                <Text color="white" mt="1rem">
                  {item.text}
                </Text>
              </Box>
            </Stack>
            <Stack
              direction="row"
              textAlign="center"
              mt="1rem"
              justify="center"
            >
              <Text color="white" fontSize="xl" fontWeight="bold">
                {item.value ?? 0}
              </Text>
              <Text
                color="white"
                fontSize="xl"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {item.unit}
              </Text>
            </Stack>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  );
};
