import { useEffect } from "react";
import { Text, TextProps, Tooltip, useClipboard } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type Props = TextProps & {
  value: string;
};

export const CopiableText = (props: Props) => {
  const { value, children, ...rest } = props;
  const { onCopy, setValue, hasCopied } = useClipboard(value);
  const { t } = useTranslation();

  useEffect(() => {
    setValue(value);
  }, [value]);

  const label = hasCopied ? t("common.copied") : t("common.copy");

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
