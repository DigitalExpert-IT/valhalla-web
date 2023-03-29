import {
  Box,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  Container,
} from "@chakra-ui/react";
import { PROJECT_LIST } from "constant/pages/projectList";
import { useTranslation } from "react-i18next";

export const SectionProject = () => {
  const { t } = useTranslation();

  return (
    <Stack mt="20" overflow="hidden">
      <Heading
        pt="20"
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
          <Image src="/assets/project/project.svg" alt="project" w="xl" />
          <Image
            src="/assets/logo/gn.svg"
            alt="logo"
            pos="absolute"
            alignSelf="center"
            w={{ base: "120px", md: "6xs" }}
          />
        </Box>
        <Stack flex={1} spacing="5">
          <Text fontSize={{ base: "md", md: "xl", lg: "40" }}>
            {t("pages.home.project.description")}
          </Text>
          <UnorderedList
            listStyleType="none"
            marginInlineStart={"none"}
            fontSize={{ base: "md", md: "lg", lg: "27" }}
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
