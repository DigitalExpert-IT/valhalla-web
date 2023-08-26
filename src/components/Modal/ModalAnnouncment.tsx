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
} from "@chakra-ui/react";

export const ModalAnnouncement = () => {
  const finalRef = React.useRef(null);
  return (
    <Modal onClose={() => {}} isOpen={true} isCentered>
      <ModalOverlay />
      <ModalContent>
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
            <Text fontWeight="semiBold" fontSize="md" textTransform="uppercase">
              We are under maintenance to improve our website. We should be back
              shortly.
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
