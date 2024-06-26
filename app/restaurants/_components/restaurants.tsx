'use client'

// React
import { useEffect, useState } from 'react'
// Next
import { notFound, useSearchParams } from 'next/navigation'
// Prisma
import { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
// Actions
import searchForRestaurants from '../_actions/search'
// Components
import BadgeTitle from '@/app/_components/badge-title'
import Header from '@/app/_components/header'
import RestaurantItem from '@/app/_components/restaurant-item'

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const searchFor = searchParams.get('search')

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return
      const foundRestaurants = await searchForRestaurants(searchFor)
      setRestaurants(foundRestaurants)
    }

    fetchRestaurants()
  }, [searchFor])

  if (!searchFor) {
    return notFound()
  }

  return (
    <>
      <Header isSearchBar={true} />

      <div className="container">
        <BadgeTitle
          title={`Resultados encontrados para "${searchFor}"`}
          variant="noButton"
          href="/"
          className="mt-6"
        />

        <div className="mt-6 flex w-full flex-col gap-4 md:grid md:grid-cols-3 md:gap-4">
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

export default Restaurants
