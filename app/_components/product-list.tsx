// Prisma
import { db } from '../_lib/prisma'
// Components
import ProductItem from './product-item'

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gte: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className="flex gap-3 overflow-x-auto pb-6 pt-6 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
