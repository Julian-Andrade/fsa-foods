// Prisma
import { Prisma } from '@prisma/client'
// Components
import ProductItem from './product-item'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { CardContent } from './ui/card'

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      <Carousel
        className="pt-6"
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="max-[1000px]:basis-44 md:basis-44"
            >
              <CardContent className="flex items-center justify-center">
                <ProductItem product={JSON.parse(JSON.stringify(product))} />
              </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}

export default ProductList
