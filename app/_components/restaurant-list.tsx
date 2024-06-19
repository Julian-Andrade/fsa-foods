// Next
import { getServerSession } from 'next-auth'
// Prisma
import { db } from '../_lib/prisma'
// Components
import RestaurantItem from './restaurant-item'
// Libs
import { authOptions } from '../_lib/auth'
import { CardContent } from './ui/card'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const RestaurantList = async () => {
  const session = await getServerSession(authOptions)

  const restaurants = await db.restaurant.findMany({ take: 5 })

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  })

  return (
    <>
      <Carousel
        className="pt-6"
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent>
          {restaurants.map((restaurant) => (
            <CarouselItem
              key={restaurant.id}
              className="max-[1000px]:basis-72 md:basis-72"
            >
              <CardContent className="flex items-center justify-center">
                <RestaurantItem
                  restaurant={JSON.parse(JSON.stringify(restaurant))}
                  userFavoriteRestaurants={userFavoriteRestaurants}
                />
              </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}

export default RestaurantList
