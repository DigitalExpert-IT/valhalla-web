import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  Controller,
  ControllerProps,
  FieldValues,
  FieldError,
  FieldPath,
  get,
  useFormState,
} from "react-hook-form";

interface FormInputProps extends Omit<InputProps, "placeholder" | "label"> {
  label?: string | null;
  placeholder?: string | undefined;
  helpertext?: string | null;
}

type Props<T extends FieldValues, TName extends FieldPath<T>> = Omit<
  ControllerProps<T, TName>,
  "render"
> &
  FormInputProps;

export const FormInput = <T extends FieldValues, TName extends FieldPath<T>>(
  props: Props<T, TName>
) => {
  const { errors } = useFormState({ control: props.control });
  const error: FieldError | null = get(errors, props.name);

  return (
    <FormControl isRequired={!!props.rules?.required} isInvalid={!!error}>
      {props.label ? <FormLabel>{props.label}</FormLabel> : null}
      <Controller
        control={props.control}
        defaultValue={props.defaultValue}
        rules={props.rules}
        name={props.name}
        render={({ field: { value, ...rest } }) => (
          <Input {...rest} value={value ?? ""} {...props} />
        )}
      />
      {props.helpertext ? (
        <FormHelperText>{props.helpertext}</FormHelperText>
      ) : null}
      <FormErrorMessage>{error?.message ?? "Invalid Value"}</FormErrorMessage>
    </FormControl>
  );
};
