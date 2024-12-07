import type { Tag } from "~/types/2-tag.type";
import type {
  AccountStatus,
  AccountTypeEnum,
  GenderEnum,
  RoleEnum,
} from "~/utils/enums";
import type { UserGroup } from "./3-user-group";

export type User = {
  _id?: string;
  roles: RoleEnum[];
  userGroupIds?: string[] | UserGroup[];
  menuGroupId?: string;
  username?: string;
  bio?: string;
  email?: string;
  phone?: string;
  socialID?: string;
  accountType: AccountTypeEnum;
  fullName: string;
  dateBirth?: Date;
  gender?: GenderEnum;
  avatar?: string;
  fmcEnabled: boolean;
  status: AccountStatus;
  topInteractedTags?: {
    tag: Tag;
    count: number;
    authorId: string;
  }[];

  questionsCount?: number;
  answersCount?: number;

  createdAt: string;
  updatedAt: string;
};

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};
