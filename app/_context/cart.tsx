/* eslint-disable no-unused-vars */
'use client'

// React
import { ReactNode, createContext, useMemo, useState } from 'react'
// Prisma
import { Prisma } from '@prisma/client'
// Helpers
import { calculateProductTotalPrice } from '../_helpers/price'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true
        }
      }
    }
  }> {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  subtotalPrice: number
  totalPrice: number
  totalDiscount: number
  totalQuantity: number
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: { restaurant: { select: { deliveryFee: true } } }
    }>
    quantity: number
    emptyCart?: boolean
  }) => void
  decreaseProductCartQuantity: (productId: string) => void
  increaseProductCartQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseProductCartQuantity: () => {},
  increaseProductCartQuantity: () => {},
  removeProductFromCart: () => {},
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity
    }, 0)
  }, [products])

  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity
      }, 0) + Number(products[0]?.restaurant.deliveryFee)
    )
  }, [products])

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity
    }, 0)
  }, [products])

  const totalDiscount =
    subtotalPrice - totalPrice + Number(products[0]?.restaurant.deliveryFee)

  // Diminuir quantidade do carrinho
  const decreaseProductCartQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct
          }
          return { ...cartProduct, quantity: cartProduct.quantity - 1 }
        }
        return cartProduct
      }),
    )
  }

  // Aumentar quantidade do carrinho
  const increaseProductCartQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return { ...cartProduct, quantity: cartProduct.quantity + 1 }
        }
        return cartProduct
      }),
    )
  }

  // Adicionar produto ao carrinho
  const addProductToCart = ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: { restaurant: { select: { deliveryFee: true } } }
    }>
    quantity: number
    emptyCart?: boolean
  }) => {
    // Verificar se há algum produto de outro restaurante no carrinho
    if (emptyCart) {
      setProducts([])
    }

    // Verificar se o producto está no carrinho
    const isProductAlreadyInCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    )

    // Se ele estiver, aumenta a sua quantidade
    if (isProductAlreadyInCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return { ...cartProduct, quantity: cartProduct.quantity + quantity }
          }
          return cartProduct
        }),
      )
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }])
  }

  // Excluir produto do carrinho
  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    )
  }

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalDiscount,
        totalQuantity,
        addProductToCart,
        decreaseProductCartQuantity,
        increaseProductCartQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
