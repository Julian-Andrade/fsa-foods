// # Prisma
import { db } from '../_lib/prisma'
// # Components
import CategoryItem from './category-item'

const CategoryList = async () => {
  const categories = await db.category.findMany({})

  return (
    <div className="flex gap-3 overflow-x-scroll pb-6 pt-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoryList
