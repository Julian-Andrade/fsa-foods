// Prisma
import { db } from '@/app/_lib/prisma'
// Components
import ProductItem from '@/app/_components/product-item'
import BadgeTitle from '@/app/_components/badge-title'
import Header from '@/app/_components/header'

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <>
      <Header isSearchBar={true} />

      <div className="container">
        <BadgeTitle
          title="Produtos Favoritos"
          variant="noButton"
          href="/"
          className="mt-6"
        />

        <div className="mt-6 grid w-full grid-cols-2 gap-4 md:grid-cols-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={JSON.parse(JSON.stringify(product))}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default RecommendedProductsPage
