// Next
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
// Prisma
import { db } from '../_lib/prisma'
// Libs
import { authOptions } from '../_lib/auth'
// Components
import BadgeTitle from '../_components/badge-title'
import Header from '../_components/header'
import RestaurantItem from '../_components/restaurant-item'

const MyFavoriteRestaurantsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return notFound()
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  })

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
        {userFavoriteRestaurants.length > 0 ? (
          userFavoriteRestaurants.map(({ restaurant }) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))
        ) : (
          <h3 className="text-muted-foreground">
            Você ainda não possui restaurantes favoritos
          </h3>
        )}
      </div>
    </div>
  )
}

export default MyFavoriteRestaurantsPage
