// Prisma
import { db } from '@/app/_lib/prisma'
// Components
import RestaurantItem from '@/app/_components/restaurant-item'
import BadgeTitle from '@/app/_components/badge-title'
import Header from '@/app/_components/header'
import { authOptions } from '@/app/_lib/auth'
import { getServerSession } from 'next-auth'

const RecommendedRestaurantsPage = async () => {
  const session = await getServerSession(authOptions)

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  })

  const restaurants = await db.restaurant.findMany({})

  return (
    <>
      <Header isSearchBar={true} />

      <div className="container">
        <BadgeTitle
          title="Restaurantes Recomendados"
          variant="noButton"
          href="/"
          className="mt-6"
        />

        <div className="mt-6 flex w-full flex-col gap-4 md:grid md:grid-cols-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default RecommendedRestaurantsPage
