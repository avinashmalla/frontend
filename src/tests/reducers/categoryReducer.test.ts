import { fetchCategories } from "../../redux/reducers/categoryReducer";
import { CategoryReducerType } from "../../types/category";
import createTestStore from "../utils/testStore";

const initialState: CategoryReducerType = {
    categories: [],
    productList: [],
}

let store = createTestStore()

beforeEach(() => {
    store = createTestStore()
})

describe('test category reducer', () => {
    test('should test initial state', () => {
        const state = store.getState().categoryReducer
        expect(state.categories.length).toBe(0)
        expect(state.productList.length).toBe(0)
    })
    test('should fetch all categories', async() => {
        await store.dispatch(fetchCategories())
        expect(store.getState().categoryReducer.categories.length).toBeGreaterThan(0)
    })
})