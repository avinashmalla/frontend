import React, { useEffect, useState } from 'react'
import { Product } from '../types/products'

const useProduct = (productId: string|undefined) => {
    const [product, setProduct] = useState<Product | undefined>(undefined)
    
    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(data => data.json())
        .then(data => setProduct(data))
    }, [productId])
    return product
}

export default useProduct