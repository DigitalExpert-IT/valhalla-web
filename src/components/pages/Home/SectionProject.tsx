import {
  Box,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { PROJECT_LIST } from "constant/pages/PROJECT_LIST";
import { useTranslation } from "react-i18next";

export const SectionProject = () => {
  const { t } = useTranslation();
  return (
    <Stack>
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
          <Image src="/assets/project/project.png" alt="project"></Image>
          <Image
            src="/assets/project/Group.png"
            alt="logo"
            pos="absolute"
            alignSelf="center"
          ></Image>
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
    </Stack>
  );
};