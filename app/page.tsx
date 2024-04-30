// Components
import CategoryList from './_components/category-list'
import Header from './_components/header'
import Search from './_components/search'

const Home = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Search />
        <CategoryList />
      </div>
    </>
  )
}

export default Home
