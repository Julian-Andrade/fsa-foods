// Prisma
import { db } from './_lib/prisma'
// Components
import Header from './_components/header'
import Search from './_components/search'
import PromoBanner from './_components/promo-banner'
import CategoryList from './_components/category-list'
import ProductList from './_components/product-list'
import BadgeTitle from './_components/badge-title'
import RestaurantList from './_components/restaurant-list'

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
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

      <PromoBanner
        src={'/banner_promo_01.png'}
        alt="até 30% de desconto em pizzas."
      />

      <BadgeTitle
        title="Produtos Recomendados"
        variant="button"
        nameButton="Ver todos"
        href={`/products/recommended`}
      />

      <ProductList products={products} />

      <PromoBanner
        src={'/banner_promo_02.png'}
        alt="a partir de R$ 17,90 em lanches."
      />

      <BadgeTitle
        title="Restaurantes Recomendados"
        variant="button"
        nameButton="Ver todos"
        href={`/restaurants/recommended`}
      />

      <RestaurantList />
    </div>
  )
}

export default Home
