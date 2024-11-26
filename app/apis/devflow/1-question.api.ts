import type { Question } from "~/types/1-question.type";
import type { PaginateResponse } from "~/types/paginate-response.type";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";
import type {
  CreateQuestion,
  UpdateQuestion,
} from "~/validations/question.validation";

const QUESTION_URL = "/questions";
export const questionApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Question>> => {
    return guestFetch.get(`${QUESTION_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<any> => {
    return authFetch.get(`${QUESTION_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Question[]> => {
    return guestFetch.get(QUESTION_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: CreateQuestion, options?: FetchOptions): Promise<Question> => {
    return authFetch.post(QUESTION_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: UpdateQuestion,
    options?: FetchOptions,
  ): Promise<Question> => {
    return authFetch.patch(`${QUESTION_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${QUESTION_URL}/${ids.join(",")}/bulk`);
  },
};
