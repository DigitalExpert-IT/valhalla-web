import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Stack, Badge, Box } from "@chakra-ui/react";
import { useModal } from "@ebay/nice-modal-react";
import { useRouter } from "next/router";
import { useAsyncCall, useValhalla, useWallet } from "hooks";
import { shortenAddress } from "utils";
import { FormInput, ModalDiscalimer, ButtonConnectWrapper } from "components";
import { validateRequired, validateAddress } from "utils";

type FormType = {
  referrer: string;
};

export const FormRegister = () => {
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
  const { ref } = router.query;
  const [referral, setReferral] = useState<string>("");

  useEffect(() => {
    setValue("referrer", router.query.referrer as string);
    setReferral(ref as string);
  }, [router.query.referrer, router.query]);

  const onSubmit = handleSubmit(data => {
    disclaimerModal.show().then(async () => {
      await register.exec(data.referrer);
    });
  });

  return (
    <Stack spacing="6" as="form" onSubmit={onSubmit}>
      <Box>
        <Badge>{shortenAddress(wallet.address)}</Badge>
      </Box>
      <FormInput
        control={control}
        name="referrer"
        helpertext={t("form.helperText.referrer")}
        label={t("form.label.referrer")}
        placeholder={t("form.placeholder.referrer") ?? ""}
        rules={{
          required: validateRequired(t("form.label.referrer")),
          validate: validateAddress,
        }}
        value={referral}
      />
      <ButtonConnectWrapper type="submit">
        <Button isLoading={register.isLoading} type="submit">
          {t("common.register")}
        </Button>
      </ButtonConnectWrapper>
    </Stack>
  );
};
