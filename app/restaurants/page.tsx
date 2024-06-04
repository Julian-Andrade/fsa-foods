// React
import { Suspense } from 'react'
// Next
import { getServerSession } from 'next-auth'
// Libs
import { authOptions } from '../_lib/auth'
// Components
import Restaurants from './_components/restaurants'
import { db } from '../_lib/prisma'

const RestaurantsPage = async () => {
  const session = await getServerSession(authOptions)

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  )
}

export default RestaurantsPage
