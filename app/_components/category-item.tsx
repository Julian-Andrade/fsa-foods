// Prisma
import { Category } from '@prisma/client'
// Next
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex w-full">
      <div className="flex w-44 items-center gap-2 rounded-full bg-white px-4 py-3 text-center shadow-md">
        <Image
          src={category.imageUrl}
          alt={category.name}
          height={30}
          width={30}
        />
        <span className="text-sm font-bold">{category.name}</span>
      </div>
    </div>
  )
}

export default CategoryItem
