import {
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Button,
} from "@chakra-ui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";

type Props = {
  rewardsAmount: number;
  claimRewards: (cb?: () => void) => () => void;
  isLoading: boolean;
};

export const ModalReward = NiceModal.create<Props>(props => {
  const modal = useModal();
  const { t } = useTranslation();
  const { claimRewards, rewardsAmount, isLoading } = props;

  const hide = () => modal.hide();

  return (
    <Modal
      size={{ base: "sm", sm: "xl" }}
      isOpen={modal.visible}
      onClose={modal.hide}
    >
      <ModalOverlay />
      <ModalContent
        p={10}
        alignSelf={"center"}
        alignItems={"center"}
        gap={5}
        fontFamily={"Poppins, Arial, sans-serif"}
      >
        <Text fontWeight={800} fontSize={20}>
          {t("modal.rewards.title")}
        </Text>
        <Image src="/images/gift-gold.png" alt="rewards" w={"30vh"} />
        <Text>{rewardsAmount} GNET</Text>
        <Button
          variant={"gradient"}
          colorScheme="purple:pink"
          borderRadius={3}
          fontWeight={800}
          onClick={claimRewards(hide)}
          isLoading={isLoading}
        >
          {t("modal.rewards.claimRewards")}
        </Button>
      </ModalContent>
    </Modal>
  );
});
