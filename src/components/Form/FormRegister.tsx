import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  Stack,
  Badge,
  Box,
  Text,
  Center,
  FormLabel,
} from "@chakra-ui/react";
import { shortenAddress } from "utils";
import { useRouter } from "next/router";
import { useModal } from "@ebay/nice-modal-react";
import { validateRequired, validateAddress } from "utils";
import { useValhallaContract } from "hooks/useValhallaContract";
import { CURRENT_CHAIN_ID, useAsyncCall, useUSDTContract } from "hooks";
import { FormInput, ModalDiscalimer, ButtonConnectWrapper } from "components";
import { useAddress, useBalance, useContractWrite } from "@thirdweb-dev/react";
import {
  ZERO_ADDRESS,
  USDT_CONTRACT,
  VALHALLA_CONTRACT,
} from "constant/address";
import { useRegistrationFee } from "hooks/valhalla";
import { BigNumber } from "ethers";

type FormType = {
  referrer: string;
};

export const FormRegister = () => {
  const valhalla = useValhallaContract();
  const usdt = useUSDTContract();
  const address = useAddress() ?? ZERO_ADDRESS;
  const balanceUsdt = useBalance(USDT_CONTRACT[CURRENT_CHAIN_ID]);
  const { t } = useTranslation();
  const valhallaRegister = useContractWrite(valhalla.contract, "register");
  const usdtApproval = useContractWrite(usdt.contract, "approve");
  const registrationFee = useRegistrationFee();

  const approveMutation = async () => {
    const allowance = (await usdt.contract?.call("allowance", [
      address,
      VALHALLA_CONTRACT[CURRENT_CHAIN_ID],
    ])) as BigNumber;
    if (!registrationFee.data) {
      return;
    }
    if (balanceUsdt.data?.value.lt(registrationFee?.data)) {
      throw {
        code: "NotEnoughBalance",
      };
    }
    if (allowance.lt(registrationFee.data)) {
      await usdtApproval.mutateAsync({
        args: [VALHALLA_CONTRACT[CURRENT_CHAIN_ID], registrationFee.data],
      });
    }
  };

  const approve = useAsyncCall(approveMutation);
  const register = useAsyncCall(
    valhallaRegister.mutateAsync,
    t("form.message.registrationSuccess"),
    () => router.replace("/profile")
  );
  const { control, setValue, handleSubmit } = useForm<FormType>();
  const disclaimerModal = useModal(ModalDiscalimer);
  const router = useRouter();

  useEffect(() => {
    setValue("referrer", router.query.ref as string);
  }, [router.query.ref]);

  const onSubmit = handleSubmit(data => {
    disclaimerModal.show().then(async () => {
      await approve.exec();
      await register.exec({
        args: [data.referrer],
      });
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
          {shortenAddress(address)}
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
        helpertext={t("form.helperText.referrer")}
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
            isLoading={register.isLoading || registrationFee.isLoading}
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
