import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAsyncCall, useValhalla } from "hooks";
import { FormInput } from "components";
import { validateRequired, validateAddress } from "utils";

type FormType = {
  referrer: string;
};

export const FormRegister = () => {
  const valhalla = useValhalla();
  const register = useAsyncCall(valhalla.register);
  const { control, setValue, handleSubmit } = useForm<FormType>();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setValue("referrer", router.query.referrer as string);
  }, [router.query.referrer]);

  const onSubmit = handleSubmit(data => {
    register.exec(data.referrer);
  });

  return (
    <Stack as="form" onSubmit={onSubmit}>
      <FormInput
        control={control}
        name="referrer"
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
