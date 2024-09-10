
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser ={
    id:string;
    password:string;
    needsPasswordChange:boolean;
    passwordChangedAt?:Date;
    role:'admin' |'student' |'faculty';
    status:'in-progess' |'blocked';
    isDeleted : boolean;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id:string):Promise<TUser>;
    isDeleted(id:string):Promise<boolean>
    isUserBlockedByCustomId(id: string): Promise<boolean>;
    isPasswordMatched(givenPassword: string, savedPassword: string): boolean;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
      ): boolean;
  }

 export  type TUserRole = keyof typeof USER_ROLE;