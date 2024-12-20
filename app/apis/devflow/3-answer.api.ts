import type { Answer } from "~/types/1-answer.type";
import type { PaginateResponse } from "~/types/paginate-response.type";
import type { UpdateResult } from "~/types/update-result";
import type { VoteActionEnum } from "~/utils/enums";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";
import type {
  CreateAnswer,
  UpdateAnswer,
} from "~/validations/answer.validation";

const ANSWER_URL = "/answers";
export const answerApi = {
  //  ----- Method: GET -----
  paginate: <T>(
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<T>> => {
    return guestFetch.get(`${ANSWER_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<any> => {
    return authFetch.get(`${ANSWER_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Answer[]> => {
    return guestFetch.get(ANSWER_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: CreateAnswer, options?: FetchOptions): Promise<Answer> => {
    return authFetch.post(ANSWER_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: UpdateAnswer,
    options?: FetchOptions,
  ): Promise<Answer> => {
    return authFetch.patch(`${ANSWER_URL}/${id}`, body, options);
  },

  updateVote: (
    action: VoteActionEnum,
    id: string,
    options?: FetchOptions,
  ): Promise<Answer> => {
    return authFetch.patch(`${ANSWER_URL}/${id}/${action}`, {}, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${ANSWER_URL}/${ids.join(",")}/bulk`);
  },
};
