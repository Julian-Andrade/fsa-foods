// Prisma
import { Category } from '@prisma/client'
// Next
import Image from 'next/image'
import Link from 'next/link'

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex w-full items-center justify-between"
    >
      <div className="flex min-h-16 min-w-44 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-center shadow-md">
        <Image
          src={category.imageUrl}
          alt={category.name}
          height={30}
          width={30}
        />
        <span className="text-sm font-bold">{category.name}</span>
      </div>
    </Link>
  )
}

export default CategoryItem
