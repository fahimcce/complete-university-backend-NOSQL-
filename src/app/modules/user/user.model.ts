import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
// import config from "../../config";
// import bcrypt from 'bcrypt';



const userSchema = new Schema<TUser,UserModel>({
    id:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:0
    },
    needsPasswordChange:{
        type:Boolean,
        default:true
    },
    passwordChangedAt:{
        type:Date,
    },
    role:{
        type:String,
        enum:['admin','student','faculty']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
      },

    isDeleted:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

// userSchema.pre('save', async function (next) {
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     const user = this; // doc
//     // hashing password and save into DB
//     user.password = await bcrypt.hash(
//       user.password,
//       Number(config.bcrypt_salt_rounds),
//     );
//     next();
//   });
  
  // set '' after saving password
//   userSchema.post('save', function (doc, next) {
//     doc.password = '';
//     next();
//   });

userSchema.statics.isUserExistsByCustomId = async function (id:string) {
    return await User.findOne({id}).select('+password')
}

userSchema.statics.isDeleted = async function(id:string){
    const isUserExists = await User.findOne({id});
    return await isUserExists?.isDeleted;
}


userSchema.statics.isUserBlockedByCustomId = async function (id: string) {
    const user = await this.findOne({ id });
    return user ? user.status === 'blocked' : false;
  };
  

  userSchema.statics.isPasswordMatched = function (givenPassword: string, savedPassword: string) {
    // Direct string comparison
    return givenPassword === savedPassword;
  };


  userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };
  
  
 
export const User = model<TUser,UserModel>('User',userSchema)