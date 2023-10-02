import React from "react";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Stack,
  AspectRatio,
  Heading,
} from "@chakra-ui/react";
import { t } from "i18next";

interface Props {
  isComingSoon: boolean;
}

export const ModalAnnouncement = (props: Props) => {
  const finalRef = React.useRef(null);
  return (
    <Modal onClose={() => {}} isOpen={true} isCentered>
      <ModalOverlay />
      <ModalContent>
        {props.isComingSoon ? (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody ref={finalRef}>
              <Stack
                align="center"
                justify="center"
                spacing="2rem"
                textAlign="center"
                mb="2rem"
              >
                <AspectRatio ratio={1} minWidth="190">
                  <Image
                    alt="coming-soon"
                    src="/images/rocket.png"
                    style={{
                      objectFit: "contain",
                    }}
                    sizes="(max-width: 768px) 100vw,"
                    fill
                  />
                </AspectRatio>
                <Heading
                  zIndex={2}
                  size={"4xl"}
                  bgGradient={
                    "linear(to-r, whiteAlpha.500, whiteAlpha.700, white)"
                  }
                  bgClip={"text"}
                  fontFamily={"Bebas Neue, Arial, sans-serif"}
                  letterSpacing={2}
                >
                  {t("pages.comingSoon.title")}
                </Heading>
                <Text zIndex={2} letterSpacing={1.5}>
                  {t("pages.comingSoon.description")}
                </Text>
              </Stack>
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader>ANNOUNCEMENT</ModalHeader>
            <ModalBody ref={finalRef}>
              <Stack
                align="center"
                justify="center"
                spacing="3rem"
                textAlign="center"
                mb="2rem"
              >
                <AspectRatio ratio={1} minWidth="190">
                  <Image
                    alt="Global Network"
                    src="/assets/logo/globalN.png"
                    style={{
                      objectFit: "contain",
                    }}
                    sizes="(max-width: 768px) 100vw,"
                    fill
                  />
                </AspectRatio>
                <Text
                  fontWeight="semiBold"
                  fontSize="md"
                  textTransform="uppercase"
                >
                  We are under maintenance to improve our website. We should be
                  back shortly.
                </Text>
              </Stack>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
