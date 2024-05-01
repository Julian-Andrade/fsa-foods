// Prisma
import { Prisma } from '@prisma/client'
// Components
import ProductItem from './product-item'

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
}

const ProductList = async ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-6 pt-6 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
