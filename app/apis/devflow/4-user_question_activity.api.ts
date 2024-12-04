import type { UserQuestionActivity } from "~/types/3-user-question-activity.type";
import type { PaginateResponse } from "~/types/paginate-response.type";
import type { UpdateResult } from "~/types/update-result";
import type { VoteActionEnum } from "~/utils/enums";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";

const USER_QUESTION_ACTIVITY_URL = "/user_question_activities";
export const userQuestionActivityApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<UserQuestionActivity>> => {
    return guestFetch.get(
      `${USER_QUESTION_ACTIVITY_URL}/paginate`,
      query,
      options,
    );
  },

  getOne: (query?: PaginationParams, options?: FetchOptions): Promise<any> => {
    return authFetch.get(`${USER_QUESTION_ACTIVITY_URL}/one`, query, options);
  },

  getMyUserQuestionActivity: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<any> => {
    return authFetch.get(`${USER_QUESTION_ACTIVITY_URL}/me`, query, options);
  },

  //  ----- Method: PATCH -----
  updateActivity: (
    action: VoteActionEnum,
    questionId: string,
    options?: FetchOptions,
  ): Promise<UserQuestionActivity> => {
    return authFetch.patch(
      `${USER_QUESTION_ACTIVITY_URL}/${action}`,
      { questionId },
      options,
    );
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(
      `${USER_QUESTION_ACTIVITY_URL}/${ids.join(",")}/bulk`,
    );
  },
};
