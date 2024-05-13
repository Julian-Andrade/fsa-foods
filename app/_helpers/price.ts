// Prisma
import { Product } from '@prisma/client'

export const calculateProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    return Number(product.price)
  }

  const discount = Number(product.price) * (product.discountPercentage / 100)

  return Number(product.price) - discount
}

export function formatCurrencyToBrazil(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
