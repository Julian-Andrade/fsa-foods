'use client'

// Next
import Image from 'next/image'
import Link from 'next/link'
// Prisma
import { Prisma } from '@prisma/client'
// Helpers
import {
  formatCurrencyToBrazil,
  calculateProductTotalPrice,
} from '../_helpers/price'
import { ChevronDown } from 'lucide-react'

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
      <div className="w-full space-y-2">
        <div className="relative h-[150px] w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-lg"
          />

          {product.discountPercentage > 0 && (
            <div className="absolute left-2 top-2 flex items-center justify-center gap-1  rounded-lg bg-primary px-2 py-1 text-white">
              <ChevronDown size={16} />
              <span className="text-sm font-bold">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>

        <div>
          <h2 className="truncate">{product.name}</h2>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {formatCurrencyToBrazil(Number(product.price))}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {calculateProductTotalPrice(product)}
              </span>
            )}
          </div>

          <span className="block text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
