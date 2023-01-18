import { Box, Button, Stack } from "@chakra-ui/react";
import { ButtonConnectWrapper } from "components/Button";
import { FormInput, FormSelect } from "components/FormUtils";

import { fromBn, toBn } from "evm-bn";
import { useAsyncCall, useSwap } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { gnetCalculation, usdtCalculation } from "utils";

interface ISwapToken {
  currency: string;
  amount: string;
  price?: number;
}

export const FormSwap = () => {
  const { currency, swapCurrency } = useSwap();
  const { exec } = useAsyncCall(swapCurrency);
  const { handleSubmit, control, watch } = useForm<ISwapToken>();
  const { t } = useTranslation();
  const [price, setPrice] = useState("");
  const onSubmit = handleSubmit(async data => {
    await exec(data);
  });

  const normalizeCurrencies = useMemo(() => {
    return Object.values(currency).map(c => {
      const USDTPair = c.pair.name === "USDT";
      return {
        ...c,
        value: c.pair.name,
        label: USDTPair ? "USDT" : "GNET",
      };
    });
  }, [currency]);

  useEffect(() => {
    const subscription = watch(value => {
      if (value.currency === "USDT") {
        const toBigNumb = toBn(value.amount ? value.amount.toString() : "0");
        const format = fromBn(gnetCalculation(toBigNumb), 9);
        setPrice(format);
        return;
      }
      const toBigNumb = toBn(value.amount ? value.amount.toString() : "0", 9);
      const format = fromBn(usdtCalculation(toBigNumb));
      setPrice(format);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Stack as="form" onSubmit={onSubmit}>
      <Stack alignItems="center" mb="5">
        <FormInput
          control={control}
          label={t("form.label.from")}
          name="price"
          helperText={t("form.helperText.balance")}
          placeholder={"0.0"}
          type="number"
          isDisabled
          value={price}
        ></FormInput>
        <Stack
          direction={{ md: "row", sm: "column", base: "column" }}
          w={"full"}
        >
          <Box flex={1}>
            <FormInput
              control={control}
              label={t("form.label.to")}
              name="amount"
              helperText={t("form.helperText.balance")}
              placeholder={"0.0"}
              type="number"
            ></FormInput>
          </Box>
          <Box>
            <FormSelect
              control={control}
              label={t("form.label.swap")}
              name="currency"
              defaultValue={"USDT"}
              option={normalizeCurrencies}
            ></FormSelect>
          </Box>
        </Stack>
      </Stack>
      <ButtonConnectWrapper>
        <Button type="submit">{t("common.swap")}</Button>
      </ButtonConnectWrapper>
    </Stack>
  );
};
