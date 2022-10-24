import { addProductToCart, removeUnitProductFromCart, removeProductFromCart, cartReducer } from "../../redux/reducers/cartReducer";
import createTestStore from "../utils/testStore";
import { testProductInCart } from "../utils/cart-utils";
import { CartType } from "../../types/cart";

const initialState: CartType = {
    myCart: []
}

const addAction = {
    type: 'cartReducer/addProductToCart',
    payload: testProductInCart
}

const removeProductFromCartAction = {
    type: 'cartReducer/removeProductFromCart',
    payload: testProductInCart
}

let store = createTestStore()

beforeEach(() => {
    store = createTestStore()
})

describe('test user reducer', () => {
    test('should add product to cart', () => {
        const state = cartReducer(initialState, addAction)
        const newProduct = state.myCart.find((product) => product.id === testProductInCart.id) 
        expect(newProduct).toBeDefined()
    })
    
    test('should remove product from cart', () => {
        const state = cartReducer(initialState, removeProductFromCartAction)
        // const newProduct = state.myCart.find((product) => product.id == testProductInCart.id) 
        // expect(newProduct).not.toBeDefined()
        expect(state.myCart.length).toBe(0)
    })
    
   
})