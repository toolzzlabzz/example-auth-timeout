import {
    user as IUser
} from "@prisma/client"

export interface IUserRegistration {
    name: string
    email: string
    password: string
    institutionId: string
}

export interface IUserLoginAttempt {
    password: string
    email: string
}

export interface IAuthenticatedUser {
    id: string
    userUuid: string | null
    name: string
    email: string
    password: string
    rememberMeToken: string | null
    institutionUnity: string | null
    institutionId: string
}

export {
    IUser
}