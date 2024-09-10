import { z } from "zod";

const loginValidationSchema = z.object({
    body:z.object({
        id:z.string({required_error:'Id is required .'}),
        password:z.string({required_error:"Password is required"})
    })
})

// for password change
const changePasswordValidationSchema = z.object({
    body:z.object({
        oldPassword:z.string({required_error:'old Password is required'}),
        newPassword:z.string({required_error:"Password is required"})
    })
})


export const AuthVaalidation={
    loginValidationSchema,
    changePasswordValidationSchema
}