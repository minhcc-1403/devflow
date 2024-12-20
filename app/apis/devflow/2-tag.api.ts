import type { Tag } from "~/types/2-tag.type";
import type { PaginateResponse } from "~/types/paginate-response.type";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";

const TAG_URL = "/tags";
export const tagApi = {
  //  ----- Method: GET -----
  paginate: <T>(
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<T>> => {
    return guestFetch.get(`${TAG_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Tag> => {
    return authFetch.get(`${TAG_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Tag[]> => {
    return guestFetch.get(TAG_URL, query, options);
  },
};
