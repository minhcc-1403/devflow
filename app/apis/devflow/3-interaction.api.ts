import type { Interaction } from "~/types/3-tag.type";
import type { PaginateResponse } from "~/types/paginate-response.type";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";

const INTERACTION_URL = "/interactions";
export const interactionApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Interaction>> => {
    return guestFetch.get(`${INTERACTION_URL}/paginate`, query, options);
  },

  viewQuestion: (
    questionId: string,
    options?: FetchOptions,
  ): Promise<Interaction> => {
    return authFetch.post(
      `${INTERACTION_URL}/view/question/${questionId}`,
      {},
      options,
    );
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Interaction[]> => {
    return guestFetch.get(INTERACTION_URL, query, options);
  },
};
