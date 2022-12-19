import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Button,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";

type Props = {};

export const ModalDiscalimer = NiceModal.create<Props>(() => {
  const modal = useModal();
  const [isAccepted, setAccepted] = useState(false);
  const { t } = useTranslation();

  const handleToggle = () => {
    setAccepted(prev => !prev);
  };

  useEffect(() => {
    if (!modal.show) setAccepted(false);
  }, [modal.show]);

  const handleAccept = () => {
    modal.resolve();
    modal.hide();
  };

  return (
    <Modal isOpen={modal.visible} onClose={modal.hide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("modal.disclaimer.title")}</ModalHeader>
        <ModalBody>
          <Flex flexDirection="column">
            <Box flex="1">
              <Text>{t("modal.disclaimer.content")}</Text>
            </Box>
            <Box pt="4">
              <Checkbox isChecked={isAccepted} onChange={handleToggle}>
                {t("common.agreeAndAccept")}
              </Checkbox>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button isDisabled={!isAccepted} onClick={handleAccept}>
            {t("common.accept")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
