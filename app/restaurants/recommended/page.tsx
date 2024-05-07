// Prisma
import { db } from '@/app/_lib/prisma'
// Components
import RestaurantItem from '@/app/_components/restaurant-item'
import BadgeTitle from '@/app/_components/badge-title'
import Header from '@/app/_components/header'

const RecommendedRestaurantsPage = async () => {
  const restaurants = await db.restaurant.findMany({})

  return (
    <div className="container">
      <Header />

      <BadgeTitle
        title="Restaurantes Favoritos"
        variant="noButton"
        href="/"
        className="mt-6"
      />

      <div className="mt-6 flex w-full flex-col gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </div>
  )
}

export default RecommendedRestaurantsPage
