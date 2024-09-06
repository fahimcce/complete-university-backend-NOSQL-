import { z } from "zod";

const userValidationSchema = z.object({
    id:z.string(),
    password:z
        .string({
            invalid_type_error:'Password must be an string'
        })
        .max(20,{message:'Password length not getter than 20'})
        .optional(),
   

});

export const UserValidation ={
    userValidationSchema
}