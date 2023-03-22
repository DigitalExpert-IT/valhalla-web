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
    <>
      <Heading
        fontSize="5xl"
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `'${t("pages.home.project.title")}'`,
          alignSelf: "center",
          display: "block",
          fontSize: { md: "111", base: "90" },
          mt: { md: "-91px", base: "-68px" },
          color: "whiteAlpha.100",
          textAlign: "center",
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
        <Box flex={1} display="flex" justifyContent="center">
          <Image src="/assets/project/project.png" alt="project" w="md" />
          <Image
            src="/assets/logo/gn.png"
            alt="logo"
            pos="absolute"
            alignSelf="center"
            w="5xs"
          />
        </Box>
        <Stack flex={1} spacing="5">
          <Text fontSize="20">{t("pages.home.project.description")}</Text>
          <UnorderedList
            listStyleType="none"
            marginInlineStart={"none"}
            fontSize="15"
          >
            {PROJECT_LIST.map((e, i) => (
              <ListItem key={i}>{e}</ListItem>
            ))}
          </UnorderedList>
        </Stack>
      </Stack>
    </>
  );
};
