import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Flex, Heading, Image } from "@chakra-ui/react";
import { t } from "i18next";
import { Trans } from "react-i18next";

interface ISectionTeamV2 {
  image: string;
  name: string;
  division: string;
}

interface SectionTeamV2Props {
  data: ISectionTeamV2[];
}

export const SectionTeamV2: React.FC<SectionTeamV2Props> = props => {
  const sizeBox = useRef(null);
  const [width, setwidth] = useState(0);

  //@ts-ignore
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setwidth(entries[0].contentRect.width);
    });
    observer.observe(sizeBox.current!);
    return () => sizeBox.current && observer.unobserve(sizeBox.current)!;
  }, [sizeBox?.current]);

  const { data } = props;
  return (
    <Box>
      <Image
        display={{ base: "none", md: "block" }}
        src="assets/pattern-2.png"
        h={"100vh"}
        w={"100vw"}
        position={"absolute"}
        opacity={0.5}
        objectFit={"cover"}
        alt="pattern"
      />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        h={"100vh"}
      >
        <Box py={{ base: 4, lg: 12 }}>
          <Heading
            fontSize={{ base: "md", md: "5xl" }}
            textAlign={"center"}
            mb={8}
            _after={{
              content: `'${t("pages.home.teamSectionV2.subTitle")}'`,
              display: "block",
              fontSize: { md: "200", base: "90" },
              mt: { md: "-130", base: "-20" },
              color: "whiteAlpha.100",
              textAlign: "center",
            }}
          >
            <Trans i18nKey="pages.home.teamSectionV2.title" />
          </Heading>
        </Box>
        <Flex
          justifyContent={"center"}
          gap={{ base: 2, md: 20 }}
          position={"relative"}
        >
          {data.map((item, idx) => (
            <Box w={{ md: "300px" }} h={{ md: "300px" }} key={idx}>
              <Box position={"absolute"}>
                <Image
                  left={{ base: (width * 12) / 100, md: "30px" }}
                  top={{ base: (width * 12) / 100, md: "30px" }}
                  position={"relative"}
                  objectFit={"cover"}
                  w={{ base: width - (width * 25) / 100, md: "238px" }}
                  h={{ base: width - (width * 25) / 100, md: "238px" }}
                  src={item.image}
                  alt="frame-1"
                />
              </Box>
              <Image
                ref={sizeBox}
                w={{ md: "300px" }}
                h={{ md: "300px" }}
                src={"assets/frame-photo.png"}
                objectFit={"contain"}
                alt="frame-2"
              />
              <Box my="5" textAlign={"center"}>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                  {item.name}
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "lg" }}
                  textTransform="capitalize"
                >
                  {item.division}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
