// Components
import CategoryList from './_components/category-list'
import Header from './_components/header'
import Search from './_components/search'

// Image
import Image from 'next/image'

const Home = () => {
  return (
    <>
      <div className="container">
        <Header />

        <Search />

        <CategoryList />

        <Image
          src={'/banner_promo_01.png'}
          alt="banner de desconto 1"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>
    </>
  )
}

export default Home
