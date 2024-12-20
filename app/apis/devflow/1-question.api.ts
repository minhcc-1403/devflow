import type { Question } from "~/types/1-question.type";
import type { PaginateResponse } from "~/types/paginate-response.type";
import type { UpdateResult } from "~/types/update-result";
import type { ActionEnum, VoteActionEnum } from "~/utils/enums";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";
import type {
  CreateQuestion,
  UpdateQuestion,
} from "~/validations/question.validation";

const QUESTION_URL = "/questions";
export const questionApi = {
  //  ----- Method: GET -----
  paginateQuestionsAnsweredBy: <T>(
    userId: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<T>> => {
    return guestFetch.get(
      `${QUESTION_URL}/answered-by/${userId}/paginate`,
      query,
      options,
    );
  },

  paginate: <T>(
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<T>> => {
    return guestFetch.get(`${QUESTION_URL}/paginate`, query, options);
  },

  getById: <T>(
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<T> => {
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

  handleVote: (questionId: string, action: VoteActionEnum): Promise<void> => {
    return authFetch.patch(`${QUESTION_URL}/${questionId}/${action}`, {});
  },

  handleSave: (questionId: string, action: ActionEnum): Promise<void> => {
    return authFetch.patch(`${QUESTION_URL}/${questionId}/${action}/save`, {});
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${QUESTION_URL}/${ids.join(",")}/bulk`);
  },
};
