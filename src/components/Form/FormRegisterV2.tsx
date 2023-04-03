import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  Stack,
  Badge,
  Box,
  Text,
  TagLabel,
  FormLabel,
  Center,
} from "@chakra-ui/react";
import { useModal } from "@ebay/nice-modal-react";
import { useRouter } from "next/router";
import { useAsyncCall, useValhalla, useWallet } from "hooks";
import { shortenAddress } from "utils";
import { FormInput, ModalDiscalimer, ButtonConnectWrapper } from "components";
import { validateRequired, validateAddress } from "utils";

type FormType = {
  referrer: string;
};

export const FormRegisterV2 = () => {
  const valhalla = useValhalla();
  const { t } = useTranslation();
  const register = useAsyncCall(
    valhalla.register,
    t("form.message.registrationSuccess")
  );
  const { control, setValue, handleSubmit } = useForm<FormType>();
  const wallet = useWallet();
  const router = useRouter();
  const disclaimerModal = useModal(ModalDiscalimer);

  useEffect(() => {
    setValue("referrer", router.query.referrer as string);
  }, [router.query.referrer]);

  const onSubmit = handleSubmit(data => {
    disclaimerModal.show().then(async () => {
      await register.exec(data.referrer);
      router.replace("/profile");
    });
  });

  return (
    <Stack spacing="2" as="form" onSubmit={onSubmit}>
      <Box pos={"absolute"} top={{ base: "6", lg: "14" }} left={"-2"}>
        <Badge
          bg={"#682EFD"}
          minW={"48"}
          py={"2"}
          px={"6"}
          fontSize={"xl"}
          fontWeight={"semibold"}
          textAlign={"right"}
          roundedRight={"50px"}
          roundedLeft={"0"}
        >
          {shortenAddress(wallet.address)}
        </Badge>
      </Box>
      <FormLabel
        py={"8"}
        textAlign={"center"}
        fontSize={{ base: "xl", sm: "3xl" }}
      >
        {t("form.label.referrer")}*
      </FormLabel>
      <FormInput
        control={control}
        name="referrer"
        px={"0"}
        fontSize={{ base: "sm", sm: "medium" }}
        placeholder={t("form.placeholder.referrer") ?? ""}
        rules={{
          required: validateRequired(t("form.label.referrer")),
          validate: validateAddress,
        }}
        _placeholder={{ color: "brand.400", opacity: "0.5" }}
        rounded={"none"}
        borderBottom={"1px"}
        bg={"white"}
        _hover={{
          bg: "white",
          borderBottomColor: "brand.500",
          borderBottom: "2px",
        }}
        _focus={{
          border: "none",
          borderBottom: "2px",
          bg: "white",
        }}
      />
      <Text fontSize={{ base: "sm", sm: "md" }}>
        {t("form.helperText.referrer")}
      </Text>
      <Center pt={"10"}>
        <ButtonConnectWrapper type="submit" border={"1px"} px={"16"}>
          <Button
            isLoading={register.isLoading}
            type="submit"
            border={"1px"}
            px={"16"}
          >
            {t("common.register")}
          </Button>
        </ButtonConnectWrapper>
      </Center>
    </Stack>
  );
};
