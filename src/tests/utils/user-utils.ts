import { CreateUserType, LoginType, PartialLoginType, User } from "../../types/user";

export const adminUser: User = {
    id: 3, 
    email: "admin@mail.com", 
    password: "admin123", 
    name: "Admin",
    role: "admin",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=229"
}

export const testUser: User = {
    id: 1, 
    email: "john@mail.com", 
    password: "changeme", 
    name: "Jhon",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6450"
}

export const adminLogin: LoginType = {
    email: "admin@mail.com",
    password: "admin123"
}

export const newUser: PartialLoginType = {
    email: "avi@mail.com", 
    password: "654321", 
    name: "Avi",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6450"
}

export const newUser2: PartialLoginType = {
    email: "itwasntme@mail.com", 
    password: "asdf", 
    name: "who created all these users",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6450"
}
export const createUserPackage: CreateUserType = {
    currentUser: adminUser,
    createPackage: newUser2
}