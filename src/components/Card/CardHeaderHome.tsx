import { Card, CardBody, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";

export const CardHeaderHome = () => {
  return (
    <Flex w={"full"} justifyContent={"center"} alignItems={"center"} my={4}>
      <Card
        zIndex={2}
        minW={{ md: "sm", lg: "md" }}
        mx={{ lg: 8 }}
        mr={4}
        w={"full"}
        bg={{ base: "transparent", md: "purple.600" }}
      >
        <CardBody p={3}>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={{ base: 4, md: 2.5 }}
            rounded={"lg"}
            overflow={"hidden"}
          >
            <GridItem
              maxH={{ base: 125, sm: 170, lg: 230 }}
              overflow={"hidden"}
              colSpan={1}
              rowSpan={1}
            >
              <Image
                src="/images/imgHeader1.png"
                alt="Dan Abramov"
                borderRadius={{ base: "2xl", md: "none" }}
                maxW={"full"}
                h={"full"}
                w={"full"}
                objectFit={"cover"}
              />
            </GridItem>
            <GridItem
              maxH={{ base: 125, sm: 170, lg: 230 }}
              overflow={"hidden"}
              colSpan={1}
              rowSpan={1}
            >
              <Image
                src="/images/imgHeader2.png"
                alt="Dan Abramov"
                borderRadius={{ base: "2xl", md: "none" }}
                maxW={"full"}
                h={"full"}
                w={"full"}
                objectFit={"cover"}
              />
            </GridItem>
            <GridItem
              maxH={{ base: 125, sm: 170, lg: 230 }}
              overflow={"hidden"}
              colSpan={1}
              rowSpan={1}
            >
              <Image
                src="/images/imgHeader3.png"
                alt="Dan Abramov"
                borderRadius={{ base: "2xl", md: "none" }}
                maxW={"full"}
                h={"full"}
                w={"full"}
                objectFit={"cover"}
              />
            </GridItem>
            <GridItem
              maxH={{ base: 125, sm: 170, lg: 230 }}
              overflow={"hidden"}
              colSpan={1}
              rowSpan={1}
            >
              <Image
                src="/images/imgHeader4.png"
                alt="Dan Abramov"
                borderRadius={{ base: "2xl", md: "none" }}
                maxW={"full"}
                h={"full"}
                w={"full"}
                objectFit={"cover"}
              />
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  )
}
