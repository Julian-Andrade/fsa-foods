// Prisma
import { db } from '../_lib/prisma'
// Components
import CategoryItem from './category-item'
import { CardContent } from './ui/card'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const CategoryList = async () => {
  const categories = await db.category.findMany({})

  return (
    <>
      <Carousel
        className="pt-6 "
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="max-[1000px]:basis-48 md:basis-48"
            >
              <CardContent className="flex items-center justify-center p-0 pb-6">
                <CategoryItem category={JSON.parse(JSON.stringify(category))} />
              </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}

export default CategoryList
