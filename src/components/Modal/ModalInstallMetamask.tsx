import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Text,
  ModalFooter,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";

export const ModalInstallMetamask = NiceModal.create(() => {
  const modal = useModal();
  const { t } = useTranslation();

  const handleInstall = () => {
    window.open("https://metamask.io/download.html", "_blank");
  };

  return (
    <Modal isOpen={modal.visible} onClose={modal.hide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("modal.metamask.title")}</ModalHeader>
        <ModalBody>
          <Box w="full" textAlign="center" px="16">
            <Image w="full" src="/metamask.svg" alt="metamask" />
            <Text>{t("modal.metamask.content")}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleInstall} colorScheme="orange">
            {t("modal.metamask.action")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
