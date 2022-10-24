import { Product } from "../../types/products"

const testProduct: Product = {
    id: '100',
    title: 'test product',
    price: 100,
    description: 'test product',
    category: {
        id: 100,
        name: 'test cateogory',
        image: ''
    },
    images: []
}

export {testProduct}