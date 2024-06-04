/* eslint-disable no-unused-vars */
'use client'

// React
import { ReactNode, createContext, useState } from 'react'
// Prisma
import { Prisma } from '@prisma/client'
// Helpers
import { calculateProductTotalPrice } from '../_helpers/price'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true
          deliveryFee: true
          deliveryTimeMinutes: true
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
  totalDiscounts: number
  totalQuantity: number
  addProductToCart: ({
    product,
    emptyCart,
  }: {
    product: CartProduct
    emptyCart?: boolean
  }) => void
  decreaseProductCartQuantity: (productId: string) => void
  increaseProductCartQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseProductCartQuantity: () => {},
  increaseProductCartQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const subtotalPrice = products.reduce((acc, product) => {
    return acc + Number(product.price) * product.quantity
  }, 0)

  const totalPrice =
    products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity
    }, 0) + Number(products[0]?.restaurant.deliveryFee)

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity
  }, 0)

  const totalDiscounts =
    subtotalPrice - totalPrice + Number(products[0]?.restaurant.deliveryFee)

  const clearCart = () => setProducts([])

  // Diminuir quantidade do carrinho
  const decreaseProductCartQuantity: ICartContext['decreaseProductCartQuantity'] =
    (productId: string) => {
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
  const increaseProductCartQuantity: ICartContext['increaseProductCartQuantity'] =
    (productId: string) => {
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
  const addProductToCart: ICartContext['addProductToCart'] = ({
    product,
    emptyCart,
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
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            }
          }
          return cartProduct
        }),
      )
    }

    setProducts((prev) => [...prev, product])
  }

  // Excluir produto do carrinho
  const removeProductFromCart: ICartContext['removeProductFromCart'] = (
    productId: string,
  ) => {
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
        totalDiscounts,
        totalQuantity,
        addProductToCart,
        decreaseProductCartQuantity,
        increaseProductCartQuantity,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
