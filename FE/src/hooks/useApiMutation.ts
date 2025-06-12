import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, ToastAndroid } from "react-native";

type InvalidateKey<TVariables> =
  | [string, ...unknown[]]
  | ((variables: TVariables) => [string, ...unknown[]]);

interface ApiMutationOptions<TVariables, TData> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  keysToInvalidate: Array<InvalidateKey<TVariables>>;
  successMessage: string | null;
  errorMessage: string;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: unknown) => void;
}

export function useApiMutation<TVariables = void, TData = unknown>({
  mutationFn,
  keysToInvalidate,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
}: ApiMutationOptions<TVariables, TData>) {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      console.log(successMessage ? `${successMessage}: ` : "성공: ", data);

      if (successMessage) {
        ToastAndroid.showWithGravity(
          successMessage,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      keysToInvalidate.forEach((key) => {
        const resolvedKey = typeof key === "function" ? key(variables) : key;

        queryClient.invalidateQueries({
          queryKey: resolvedKey,
          exact: false,
        });
      });

      if (onSuccess) {
        onSuccess(data, variables);
      }
    },
    onError: (error) => {
      console.log(errorMessage, ": ", error);

      Alert.alert(errorMessage, "잠시 후 다시 시도해주세요.");

      if (onError) {
        onError(error);
      }
    },
  });
}
