import { Heading, Text, Box, HStack, Button } from "@chakra-ui/react";
import { Trans, useTranslation } from "react-i18next";
import Link from "next/link";
import { LayoutMain, WidgetMainHeader } from "components";
import { HEADER_IMAGE_DATA } from "constant/pages/home";

export default function Home() {
  const { t } = useTranslation();

  return (
    <LayoutMain>
      <WidgetMainHeader
        pt={{ base: "0", lg: "16" }}
        imageData={HEADER_IMAGE_DATA}
      >
        <Box px={{ base: "4", lg: "16" }} py={{ base: "0", lg: "16" }}>
          <Heading textAlign={{ base: "center", lg: "initial" }} as="h1">
            <Trans
              i18nKey="pages.home.header.title"
              components={{
                strong: <Text as="span" color="secondary.500" />,
              }}
            />
          </Heading>
          <Text
            textAlign={{ base: "center", lg: "initial" }}
            mt="4"
            fontSize="lg"
          >
            <Trans i18nKey="pages.home.header.subtitle" />
          </Text>
          <HStack justify={{ base: "center", lg: "start" }} mt="6" spacing="4">
            <Link href="/register">
              <Button colorScheme="brand">{t("common.register")}</Button>
            </Link>
            <Button colorScheme="brand">Telegram</Button>
          </HStack>
        </Box>
      </WidgetMainHeader>
    </LayoutMain>
  );
}
