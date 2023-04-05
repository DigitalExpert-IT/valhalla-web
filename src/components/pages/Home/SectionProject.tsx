import {
  Box,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  AspectRatio,
} from "@chakra-ui/react";
import { PROJECT_LIST } from "constant/pages/projectList";
import { useTranslation } from "react-i18next";
import { ProjectImage } from "./ProjectImage";

export const SectionProject = () => {
  const { t } = useTranslation();

  return (
    <Stack pt="10" overflow="hidden">
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          fontWeight: "black",
          background:
            "linear-gradient(90deg, rgba(156, 41, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          content: `'${t("pages.home.project.title")}'`,
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          textTransform: "uppercase",
          color: "whiteAlpha.100",
          transform: {
            base: "scale(3) translateY(-9px) translateX(1px)",
            md: "scale(3) translateY(-15px)",
            xl: "scale(4) translateY(-8px)",
          },
        }}
      >
        {t("pages.home.project.title")}
      </Heading>
      <Stack
        direction={{ md: "row", base: "column-reverse" }}
        textAlign={{ md: "start", base: "center" }}
        spacing="8"
        alignItems="center"
      >
        <Box flex={1} display="flex" justifyContent="center" mt="5">
          <AspectRatio w="100%" minW="300px" ratio={1}>
            <ProjectImage />
          </AspectRatio>
        </Box>
        <Stack flex={1} spacing="5">
          <Box maxW="5xl">
            <Text
              fontSize={{ base: "md", md: "3xl", xl: "40" }}
              fontWeight="200"
            >
              {t("pages.home.project.description")}
            </Text>
          </Box>
          <UnorderedList
            listStyleType="none"
            fontWeight="200"
            marginInlineStart={"none"}
            fontSize={{ base: "md", md: "lg", xl: "27" }}
          >
            {PROJECT_LIST.map((e, i) => (
              <ListItem key={i}>{e}</ListItem>
            ))}
          </UnorderedList>
        </Stack>
      </Stack>
    </Stack>
  );
};
