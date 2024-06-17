// Next
import { notFound } from 'next/navigation'
// Prisma
import { db } from '@/app/_lib/prisma'
// Components
import ProductImage from './_components/product-image'
import ProductDetails from './_components/product-details'
import ProductList from '@/app/_components/product-list'
import { Card } from '@/app/_components/ui/card'
import Header from '@/app/_components/header'

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  })

  const juices = await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <>
      <Header isSearchBar={true} />

      <div className="md:container md:mt-6">
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <ProductImage product={JSON.parse(JSON.stringify(product))} />

          <Card className="border-solid border-gray-300 bg-[#ececec]">
            <ProductDetails
              product={JSON.parse(JSON.stringify(product))}
              complementaryProducts={juices}
            />
          </Card>
        </div>

        <div className="flex flex-col gap-2 sm:hidden md:col-span-2 md:block">
          <h3 className="mt-6 font-bold">Bebidas</h3>
          <p className="text-sm text-muted-foreground">
            Adicione uma bebida ao seu pedido
          </p>
          <ProductList products={juices} />
        </div>
      </div>
    </>
  )
}

export default ProductPage
