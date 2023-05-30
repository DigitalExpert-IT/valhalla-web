import { Button, Flex, Image } from "@chakra-ui/react";
import { FormInput } from "components/FormUtils";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { validateRequired } from "utils";

type FormType = {
  link: string;
};

export const FormShareToEarn = (props: { mediaName: string }) => {
  const { control } = useForm<FormType>();
  const { t } = useTranslation();

  return (
    <Flex mt={3} gap={2}>
      <FormInput
        control={control}
        name={"link"}
        placeholder={
          t(`pages.share.placeholder`, { media: props.mediaName }) ?? ""
        }
        rules={{
          required: validateRequired(
            t("form.label.link", { media: props.mediaName })
          ),
        }}
      />
      <Button variant={"solid"} colorScheme={"brand"}>
        <Image src="/assets/icon/send.png" w={5} h={5} alt="send-icon" />
      </Button>
    </Flex>
  );
};
