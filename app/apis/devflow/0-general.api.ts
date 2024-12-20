import type { UserBadgeCounts } from "~/types/0-general.type";
import type { SearchableTypesEnum } from "~/utils/enums";
import { guestFetch } from "~/utils/fetch";

const GENERAL_URL = "/generals";
export const generalApi = {
  //  ----- Method: GET -----
  globalSearch: (
    keyword: string,
    searchType?: SearchableTypesEnum,
  ): Promise<
    {
      searchType: SearchableTypesEnum;
      _id: string;
      title: string;
    }[]
  > => {
    return guestFetch.get(`${GENERAL_URL}/global-search`, {
      keyword,
      searchType,
    });
  },

  getUserBadgeCounts: (userId: string): Promise<UserBadgeCounts> => {
    return guestFetch.get(`${GENERAL_URL}/badges/user/${userId}`);
  },
};
