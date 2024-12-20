import type { SearchableTypesEnum } from "~/utils/enums";
import { guestFetch } from "~/utils/fetch";

const GENERAL_URL = "/generals";
export const generalApi = {
  //  ----- Method: GET -----
  globalSearch: <T>(
    keyword: string,
    searchType?: SearchableTypesEnum,
  ): Promise<T> => {
    return guestFetch.get(`${GENERAL_URL}/global-search`, {
      keyword,
      searchType,
    });
  },
};
