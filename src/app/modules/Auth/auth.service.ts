import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";


const loginUserIntoDB = async(payload:TLoginUser)=>{
     
    const user = await User.isUserExistsByCustomId(payload.id);

    // is user is Exists
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not found!!')
    }

    // is User is Deleted
    if(await User.isDeleted(payload.id)){
        throw new AppError(httpStatus.FORBIDDEN,'This user is Deleted!!')
    }

    // is User is Blocked
    if (await User.isUserBlockedByCustomId(payload.id)) {
        throw new AppError(httpStatus.FORBIDDEN,'This user is Blocked!!')
    }

    // Check if the password matches directly
     const isPasswordCorrect = User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordCorrect) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password');
    }

    //-------create token & sent to the client
    const jwtPayload={
        userId:user.id,
        role:user.role
    }

    const accessToken = jwt.sign(jwtPayload, 
        config.jwt_access_secret as string, 
        { 
        expiresIn: '10d' 
    });
      
    return{
        accessToken,
        needsPasswordChange:user?.needsPasswordChange,
    }
}


//------------------------------Change Password---------------------
const changePasswordIntoDB = async (userData:JwtPayload,payload:{oldPassword:string,newPassword:string})=>{


    const user = await User.isUserExistsByCustomId(userData.userId);
    
    // is user is Exists
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not found!!')
    }

    // is User is Deleted
    if(await User.isDeleted(user.id)){
        throw new AppError(httpStatus.FORBIDDEN,'This user is Deleted!!')
    }

    // is User is Blocked
    if (await User.isUserBlockedByCustomId(user.id)) {
        throw new AppError(httpStatus.FORBIDDEN,'This user is Blocked!!')
    }

    // Check if the password matches directly
     const isPasswordCorrect = User.isPasswordMatched(payload.oldPassword, user.password);
    if (!isPasswordCorrect) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password do not matched');
    }




    await User.findOneAndUpdate({
        id:userData.userId,
        role:userData.role
    },{
        password:payload.newPassword,
        needsPasswordChange:false,
        passwordChangedAt:new Date()
    })

    return null;
}

export const AuthServices = {
    loginUserIntoDB,
    changePasswordIntoDB
}