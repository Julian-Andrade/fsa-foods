// Prisma
import { Product } from '@prisma/client'
// Icons
import { ChevronDown } from 'lucide-react'

interface BadgeDiscountProps {
  product: Pick<Product, 'discountPercentage'>
  className?: string
}

const BadgeDiscount = ({ product }: BadgeDiscountProps) => {
  return (
    <div className="flex items-center justify-center gap-1 rounded-lg bg-primary px-2 py-1 text-white">
      <ChevronDown size={16} />
      <span className="text-sm font-bold">{product.discountPercentage} %</span>
    </div>
  )
}

export default BadgeDiscount
