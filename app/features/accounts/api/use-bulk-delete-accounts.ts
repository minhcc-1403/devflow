import { accountApi } from "~/apis/0-account.api";

export const useBulkDeleteAccounts = () => {
  const ids = ref<string[]>([]);

  const { error, execute, status } = useAsyncData(
    () => accountApi.deleteManyByIds(ids.value),
    { server: false, immediate: false },
  );

  const executeBulkDelete = async (_ids: string[]) => {
    ids.value = _ids;

    // execute
    await execute();
  };

  return {
    executeBulkDelete,
    status,
    error,
  };
};
