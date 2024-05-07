// Next
import { notFound } from 'next/navigation'
// Prisma
import { db } from '@/app/_lib/prisma'
// Components
import Header from '@/app/_components/header'
import BadgeTitle from '@/app/_components/badge-title'
import ProductItem from '@/app/_components/product-item'

interface CategoriesPageProps {
  params: {
    id: string
  }
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      product: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!category) {
    return notFound()
  }

  return (
    <div className="container">
      <Header />

      <BadgeTitle
        title={category.name}
        variant="noButton"
        href="/"
        className="mt-6"
      />

      <div className="mt-6 grid grid-cols-2 gap-6">
        {category.product.map((category) => (
          <ProductItem
            key={category.id}
            product={category}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
