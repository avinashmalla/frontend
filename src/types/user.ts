export type UserRole = 'customer'|'admin'

export interface User{
    id: number,
    name: string,
    role: UserRole,
    email: string,
    password: string,
    avatar: string | undefined //undefined because you might want to leave avatar empty
}

export interface UserReducerStateType{
    userList: User[],
    currentUser: User | undefined
}

export interface LoginType {
    email: string,
    password: string
}

export interface CreateUserType {
    currentUser: User,
    createPackage: Partial<User>
}

export interface PartialLoginType extends Partial<User>{}