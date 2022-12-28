import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ModalBindTelegram = NiceModal.create(() => {
  const modal = useModal();
  const [username, setUsername] = useState("");
  const { t } = useTranslation();

  const handleSave = () => {
    modal.resolve(username);
  };

  return (
    <Modal isOpen={modal.visible} onClose={modal.hide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("modal.bindTelegram.title")}</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>{t("modal.bindTelegram.label.username")}</FormLabel>
            <Input
              placeholder={
                t("modal.bindTelegram.placeholder.username") as string
              }
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            onClick={handleSave}
            isDisabled={!username}
          >
            {t("modal.bindTelegram.label.connect")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
