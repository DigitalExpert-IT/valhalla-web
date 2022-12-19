import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Stack, Badge, Box } from "@chakra-ui/react";
import { useModal } from "@ebay/nice-modal-react";
import { useRouter } from "next/router";
import { useAsyncCall, useValhalla, useWallet } from "hooks";
import { shortenAddress } from "utils";
import { FormInput, ModalDiscalimer } from "components";
import { validateRequired, validateAddress } from "utils";

type FormType = {
  referrer: string;
};

export const FormRegister = () => {
  const valhalla = useValhalla();
  const register = useAsyncCall(valhalla.register);
  const { control, setValue, handleSubmit } = useForm<FormType>();
  const { t } = useTranslation();
  const wallet = useWallet();
  const router = useRouter();
  const disclaimerModal = useModal(ModalDiscalimer);

  useEffect(() => {
    setValue("referrer", router.query.referrer as string);
  }, [router.query.referrer]);

  const onSubmit = handleSubmit(data => {
    disclaimerModal.show().then(() => {
      register.exec(data.referrer);
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
        helperText={t("form.helperText.referrer")}
        label={t("form.label.referrer")}
        placeholder={t("form.placeholder.referrer")}
        rules={{
          required: validateRequired(t("form.label.referrer")),
          validate: validateAddress,
        }}
      />
      <Button isLoading={register.isLoading} type="submit">
        {t("common.register")}
      </Button>
    </Stack>
  );
};
