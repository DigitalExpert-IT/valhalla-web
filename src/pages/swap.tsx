import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { LayoutMain } from "components";
import { useGlobalExchange } from "hooks";
import { useForm } from "react-hook-form";

const Swap = () => {
  const { currency, swapToken } = useGlobalExchange();
  const { register, handleSubmit } = useForm();
  const onSwap = (e: any) => {
    console.log("quantity", e.quantity);
  };
  return (
    <LayoutMain>
      <Stack as={"form"} onSubmit={handleSubmit(onSwap)}>
        <FormControl>
          <FormLabel>Swap Token</FormLabel>
          <Input placeholder="quantity...!!" {...register("quantity")}></Input>
        </FormControl>
        <Box display="flex" justifyContent={"center"}>
          <Button>S</Button>
        </Box>
        <FormControl>
          <FormLabel>Swap Token</FormLabel>
          <Input placeholder="quantity...!!" {...register("quantity")}></Input>
        </FormControl>
        <Button type="submit">Swap</Button>
      </Stack>
    </LayoutMain>
  );
};

export default Swap;
