import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";


const userSchema = new Schema<TUser>({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['user', 'admin']
    },
    address:{
        type:String,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true,
}
);


export const User = model<TUser>('User', userSchema);