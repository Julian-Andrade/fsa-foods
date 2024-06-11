// Next
import { getServerSession } from 'next-auth'
// Prisma
import { db } from '../_lib/prisma'
// Components
import RestaurantItem from './restaurant-item'
// Libs
import { authOptions } from '../_lib/auth'

const RestaurantList = async () => {
  const session = await getServerSession(authOptions)

  const restaurants = await db.restaurant.findMany({ take: 5 })

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  })

  return (
    <div className="flex gap-3 overflow-x-auto pb-6 pt-6 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={JSON.parse(JSON.stringify(restaurant))}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  )
}

export default RestaurantList
