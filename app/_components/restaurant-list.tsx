// Prisma
import { db } from '../_lib/prisma'
// Components
import RestaurantItem from './restaurant-item'

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 })

  return (
    <div className="flex gap-3 overflow-x-auto pb-6 pt-6 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}

export default RestaurantList
