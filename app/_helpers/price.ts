// Prisma
import { Product } from '@prisma/client'

export function formatCurrencyToBrazil(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const CalculateProductTotalPrice = (product: Product) => {
  if (product.discountPercentage === 0) {
    return formatCurrencyToBrazil(Number(product.price))
  }

  const discount = (Number(product.price) * product.discountPercentage) / 100

  const priceWithDiscount = Number(product.price) - discount

  return formatCurrencyToBrazil(priceWithDiscount)
}
