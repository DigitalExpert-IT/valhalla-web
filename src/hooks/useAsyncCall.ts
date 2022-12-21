import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { getErrorMessage, IErrorType } from "utils/error";

/**
 * this hooks will simplify the integration between
 * async function call with react loading, data, and error state
 * the error will be automatically displayed as toast
 * @param fn async function
 */
export const useAsyncCall = <T, A extends any[]>(
  fn: (...args: A) => Promise<T>
) => {
  const [state, setState] = useState<{
    isLoading: boolean;
    data: null | T;
    errorMessage?: string | undefined | null;
  }>({
    isLoading: false,
    data: null as T,
  });
  const toast = useToast();

  const exec = async (...args: A) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const data = await fn(...args);
      setState(prev => ({ ...prev, data }));
      return data as T;
    } catch (error: IErrorType | any) {
      const formattedErrorMessage = getErrorMessage(error);
      toast({ status: "error", description: formattedErrorMessage });
      setState(prev => ({
        ...prev,
        errorMessage: formattedErrorMessage!,
      }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
    return {} as T;
  };

  return { ...state, exec };
};
