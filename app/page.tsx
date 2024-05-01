// Next
import Image from 'next/image'
// Prisma
import { db } from './_lib/prisma'
// Components
import Header from './_components/header'
import Search from './_components/search'
import CategoryList from './_components/category-list'
import ProductList from './_components/product-list'
import BadgeTitle from './_components/badge-title'

const Home = async () => {
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
    <div className="container">
      <Header />

      <Search />

      <CategoryList />

      <Image
        src={'/banner_promo_01.png'}
        alt="até 30% de desconto em pizzas"
        width={0}
        height={0}
        className="mb-6 h-auto w-full object-contain"
        sizes="100vw"
        quality={100}
      />

      <BadgeTitle title="Produtos Recomendados" />

      <ProductList products={products} />
    </div>
  )
}

export default Home
