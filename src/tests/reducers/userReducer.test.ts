import { fetchAllUsers, loginAsync, loginByToken, fetchSingleUser, createUserAsync, logOut } from "../../redux/reducers/userReducer"
import { User } from "../../types/user"
import createTestStore from "../utils/testStore"
import { testUser, newUser2, adminLogin, adminUser, createUserPackage } from "../utils/user-utils"

let store = createTestStore()
const testToken = JSON.stringify(localStorage.getItem(`john@mail.com`))

//cleanup before each test
beforeEach(() => {
    store = createTestStore()
})

describe('test user reducer', () => {
    test('user should login successfully', async () => {
        await store.dispatch(loginAsync(adminLogin))
        expect(store.getState().userReducer.currentUser).toBeDefined()
    })
    // test('user should not login with wrong credentials', async () => {
    //     await store.dispatch(loginAsync({
    //         email: 'john@mail.com',
    //         password: 'changemed'
    //     }))
    //     expect(store.getState().userReducer.currentUser).toBeUndefined()
    // })
    // test('user should login with token', async () => {
    //     await store.dispatch(loginByToken(testToken))
    //     expect(store.getState().userReducer.currentUser).toBeDefined()
    // })
    test('should get all users', async () => {
        await store.dispatch(fetchAllUsers(adminUser))
        expect(store.getState().userReducer.userList.length).toBeGreaterThan(0)
    })
    // test('should NOT fetch: non-admin login', async () => {
    //     await store.dispatch(fetchAllUsers(testUser))
    //     expect(store.getState().userReducer.userList.length).toBe(0)
    // })
    test('should extract one user', async () => {
        await store.dispatch(fetchSingleUser('Jhon'))
        expect(store.getState().userReducer.userList.length).toBe(1)
    })
    // test('should add new user', () => {
    //     store.dispatch(createUserAsync(createUserPackage))
    //     const state = store.getState().userReducer
    //     const addedUser = state.userList.find((item) => item.name === createUserPackage.createPackage.name)
    //     // expect(store.getState().userReducer.userList.length).toBe(l+1)
    //     expect(store.getState().userReducer).toBeDefined()
    //     expect(addedUser).toBeDefined()
    // })
    test('should log off current user', () => {
        store.dispatch(logOut)
        expect(store.getState().userReducer.currentUser).toBeUndefined()
    })
})
