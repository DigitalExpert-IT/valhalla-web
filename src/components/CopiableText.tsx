import { useEffect } from "react";
import {
  Text,
  TextProps,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useScreen } from "hooks";

type Props = TextProps & {
  value: string;
};

export const CopiableText = (props: Props) => {
  const { isMobileScreen } = useScreen();
  const { value, children, ...rest } = props;
  const { onCopy, setValue, hasCopied } = useClipboard(value);
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    setValue(value);
  }, [value]);

  const label = hasCopied ? t("common.copied") : t("common.copy");

  useEffect(() => {
    if (hasCopied && isMobileScreen) {
      toast({
        title: t("common.copied"),
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [hasCopied]);

  return (
    <Tooltip label={label} placement="top" closeOnClick={false}>
      <Text
        display="inline"
        _hover={{
          fontWeight: "bold",
        }}
        {...rest}
        cursor="pointer"
        onClick={onCopy}
      >
        {children}
      </Text>
    </Tooltip>
  );
};
