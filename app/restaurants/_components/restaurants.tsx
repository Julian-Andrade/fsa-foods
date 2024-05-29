'use client'

// React
import { useEffect, useState } from 'react'
// Next
import { notFound, useSearchParams } from 'next/navigation'
// Prisma
import { Restaurant } from '@prisma/client'
// Actions
import serachForRestaurant from '../_actions/search'
// Components
import BadgeTitle from '@/app/_components/badge-title'
import Header from '@/app/_components/header'
import RestaurantItem from '@/app/_components/restaurant-item'

const Restaurants = () => {
  const searchParams = useSearchParams()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const searchFor = searchParams.get('search')

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return
      const foundRestaurants = await serachForRestaurant(searchFor)
      setRestaurants(foundRestaurants)
    }

    fetchRestaurants()
  }, [searchFor])

  if (!searchFor) {
    return notFound()
  }

  return (
    <div className="container">
      <Header />

      <BadgeTitle
        title="Restaurantes Encontrados"
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

export default Restaurants
