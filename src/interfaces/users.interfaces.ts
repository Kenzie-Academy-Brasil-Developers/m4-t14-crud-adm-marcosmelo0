import { QueryResult } from "pg";
import { z } from "zod";
import {
  userCreatedSchema,
  userSchema,
  userWithoutPasswordSchema,
  allUsersSchema,
  userUpdatedWithoutPasswordSchema,
  userUpdateSchema,
  userUpdatedSchema,
} from "../schemas/user.schemas";

export type TUserRequest = z.infer<typeof userSchema>;
export type TUserUpdateRequest = z.infer<typeof userUpdateSchema>;
export type TUserResponse = z.infer<typeof userWithoutPasswordSchema>;
export type TUserUpdateResponse = z.infer<
  typeof userUpdatedWithoutPasswordSchema
>;
export type TUserResponseWithPassword = z.infer<typeof userSchema>;
export type TUserWithPassword = z.infer<typeof userCreatedSchema>;
export type TAllUsersReturn = z.infer<typeof allUsersSchema>;
export type TUserQueryResponse = QueryResult<TUserWithPassword>;
export type TUserUpdatedQueryResponse = QueryResult<typeof userUpdatedSchema>;
export type TUserUpdateQueryResponse = QueryResult<TUserUpdateResponse>;
