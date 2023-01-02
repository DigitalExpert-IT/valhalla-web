import { Badge, Box, Button, Stack } from "@chakra-ui/react";
import { ButtonConnectWrapper } from "components/Button";
import { FormInput, FormSelect } from "components/FormUtils";
import { fromBn } from "evm-bn";
import { useAsyncCall, useSwap } from "hooks";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { validateRequired } from "utils";

interface ISwapToken {
  currency: string;
  quantity: number;
}

export const FormSwap = () => {
  const { currency, swapToken } = useSwap();
  const { exec } = useAsyncCall(swapToken);
  const { handleSubmit, control, watch } = useForm<ISwapToken>();
  const { t } = useTranslation();
  const onSubmit = handleSubmit(async data => {
    await exec(data);
  });

  const normalizeCurrencies = useMemo(() => {
    return Object.values(currency).map(c => {
      const USDTPair = c.pair.name === "USDT";
      return {
        ...c,
        value: c.pair.name,
        label: USDTPair ? "GNET / USDT" : "USDT / GNET",
      };
    });
  }, [currency]);

  const USDTFormat = fromBn(
    currency.gnet.pair?.price?.mul(
      watch("quantity") ? Number(watch("quantity")) : 1
    )
  );
  const GNETFormat = fromBn(
    currency.usdt.pair?.price?.mul(
      watch("quantity") ? Number(watch("quantity")) : 1
    ),
    9
  );

  return (
    <Stack as="form" onSubmit={onSubmit}>
      <Stack alignItems="center">
        <FormSelect
          control={control}
          label={t("form.label.swap")}
          name="currency"
          placeholder={t("form.placeholder.selectCurrency")}
          rules={{
            required: validateRequired(t("form.label.swap")),
          }}
          option={normalizeCurrencies}
        ></FormSelect>
        <FormInput
          control={control}
          label={t("form.label.quantity")}
          name="quantity"
          rules={{
            required: validateRequired(t("form.label.swap")),
          }}
          placeholder={t("form.placeholder.quantity")}
        ></FormInput>
      </Stack>
      <Box>
        {watch("currency") && watch("quantity") && (
          <Badge float={"right"}>{`${
            watch("currency") === "USDT" ? USDTFormat : GNETFormat
          } ${watch("currency")}`}</Badge>
        )}
      </Box>
      <ButtonConnectWrapper>
        <Button type="submit">{t("common.swap")}</Button>
      </ButtonConnectWrapper>
    </Stack>
  );
};
