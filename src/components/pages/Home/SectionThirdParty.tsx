import { Button, Heading, Image, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const SectionThirdParty = () => {
  const { t } = useTranslation();
  return (
    <VStack
      justifyContent={"center"}
      h={"120vh"}
      paddingTop={"5rem"}
      bgColor={"#6D02C9"}
      w={"full"}
      overflowX={"hidden"}
    >
      <Heading
        fontWeight="black"
        fontSize={{ base: "3xl", md: "7xl" }}
        textAlign="center"
        textTransform="uppercase"
        _after={{
          content: `"${t("common.thirdPartyColaboration")}"`,
          alignSelf: "center",
          display: "block",
          color: "whiteAlpha.100",
          fontWeight: "900",
          textAlign: "center",
          textTransform: "uppercase",
          transform: "scale(1.5) translateY(-45px)",
        }}
      >
        {t("common.thirdPartyColaboration")}
      </Heading>
      <Image
        src="assets/thirdparty.png"
        objectFit={"contain"}
        h={"65%"}
        alt="third-party"
      />
      <Link
        href={
          "https://drive.google.com/file/d/10ubyvzXEYq-6cN1OqIuYQ34iepeVp08Z/view?usp=sharing"
        }
        target="_blank"
      >
        <Button
          py={2}
          bgGradient={"linear(to-l, #E41CD0, #21B6E4)"}
          _hover={{
            bgGradient: "linear(to-l, #681c60, #21B6E4)",
          }}
          disabled={false}
        >
          {t("common.learnMore")}
        </Button>
      </Link>
    </VStack>
  );
};
