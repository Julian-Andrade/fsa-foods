// Next
import Image from 'next/image'
// Components
import Header from './_components/header'
import Search from './_components/search'
import CategoryList from './_components/category-list'
import ProductList from './_components/product-list'
import BadgeTitle from './_components/badge-title'

const Home = () => {
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

      <ProductList />
    </div>
  )
}

export default Home
