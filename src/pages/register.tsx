import {
  Heading,
  Text,
  Card,
  CardBody,
  Box,
  Stack,
  Image,
} from "@chakra-ui/react";
import { FormRegister, LayoutMainV2 } from "components";
import { Trans } from "react-i18next";

const Registerv2 = () => {
  return (
    <LayoutMainV2>
      <Stack bgGradient="linear(#2C1FA7 0%, #6D02C9 100%)">
        <Stack
          alignItems={"center"}
          minH={"100vh"}
          bgImage="url('/images/bgHeader_home.png')"
          gap={"8"}
          pb={"10"}
        >
          <Box
            as="header"
            textAlign="center"
            px={{ base: "8", lg: "4" }}
            letterSpacing={{ base: "normal", md: "0.2em" }}
          >
            <Heading
              pt={{ base: "24", sm: "36" }}
              as="h1"
              textAlign="center"
              textTransform={"uppercase"}
            >
              <Trans
                i18nKey="pages.register.title"
                components={{
                  strong: (
                    <Text
                      as="span"
                      variant="gradient"
                      colorScheme="orange:pink"
                    />
                  ),
                }}
              />
            </Heading>
            <Text mt="4" fontSize="2xl" fontWeight={"hairline"}>
              <Trans
                i18nKey="pages.register.subtitle"
                components={{
                  strong: <Text as="span" />,
                }}
              />
            </Text>
          </Box>
          <Card
            bg={"white"}
            rounded={{ base: "3xl", lg: "50px" }}
            w="full"
            mx="auto"
            maxW="4xl"
            overflow={"hidden"}
          >
            <CardBody
              display={"flex"}
              flexDir={{ base: "column", lg: "row" }}
              p="0"
            >
              <Box
                w={{ base: "full", lg: "50%" }}
                borderRight={{ base: "none", lg: "8px" }}
                color={"blackAlpha.300"}
                zIndex={"1"}
              >
                <Box
                  bg={"#682EFD"}
                  py={"20"}
                  zIndex={"99"}
                  bgImage="url('/images/img-register-clipPath.png')"
                  backgroundPosition={"center"}
                  backgroundSize={"contain"}
                >
                  <Image
                    src="/images/image_register.png"
                    alt="pattern2"
                    mx={"auto"}
                  />
                </Box>
              </Box>
              <Stack
                w={{ base: "full", lg: "50%" }}
                minH={"sm"}
                px={{ base: "4", md: "12" }}
                color={"brand.400"}
                borderLeft={{ base: "8px", lg: "none" }}
                borderColor={"blackAlpha.300"}
                pos={"relative"}
                justifyContent={"center"}
              >
                <FormRegister />
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Stack>
    </LayoutMainV2>
  );
};

export default Registerv2;
