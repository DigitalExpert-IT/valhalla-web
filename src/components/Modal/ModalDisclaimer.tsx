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
    if (!modal.visible) setAccepted(false);
  }, [modal.visible]);

  const handleAccept = () => {
    modal.resolve();
    modal.hide();
  };

  return (
    <Modal
      size={{ base: "sm", sm: "xl" }}
      isOpen={modal.visible}
      onClose={modal.hide}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text variant="gradient" colorScheme="purple:pink">
            {t("modal.disclaimer.title")}
          </Text>
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection="column">
            <Box
              borderStyle="solid"
              borderColor="gray.600"
              p="6"
              borderRadius="lg"
              borderWidth="thin"
              overflowY="scroll"
              flex="1"
            >
              <Text>{t("modal.disclaimer.content")}</Text>
            </Box>
            <Box pt="4">
              <Checkbox
                colorScheme="green"
                isChecked={isAccepted}
                onChange={handleToggle}
              >
                {t("common.agreeAndAccept")}
              </Checkbox>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            isDisabled={!isAccepted}
            onClick={handleAccept}
          >
            {t("common.accept")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
