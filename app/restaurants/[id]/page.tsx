// Next
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
// Prisma
import { db } from '@/app/_lib/prisma'
// Components
import RestaurantImage from './_components/restaurant-image'
import DeliveryInfo from '@/app/_components/delivery-info'
import Header from '@/app/_components/header'
// Icons
import { StarIcon } from 'lucide-react'
import BadgeTitle from '@/app/_components/badge-title'
import ProductList from '@/app/_components/product-list'
import CartBanner from './_components/cart-banner'
// Libs
import { authOptions } from '@/app/_lib/auth'

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          product: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      product: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!restaurant) {
    return notFound()
  }

  const session = await getServerSession(authOptions)

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <>
      <Header isSearchBar={true} />

      <div className="md:px-[1.25rem]">
        <div className="md:mt-6 md:grid md:grid-cols-3">
          <div className="md:col-span-2">
            <RestaurantImage
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          </div>
          <div>
            {/* Restaurant Details */}
            <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-[#ececec] p-5">
              {/* Produto */}
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8">
                    <Image
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h1 className="text-lg font-bold">{restaurant.name}</h1>
                </div>
                {/* Star Badge */}
                <div className="flex items-center justify-center gap-1  rounded-lg bg-white px-2 py-1">
                  <StarIcon
                    className="fill-amber-400 text-amber-400"
                    size={16}
                  />
                  <span className="text-xs font-bold">5.0</span>
                </div>
              </div>
              {/* Informações de Entrega */}
              <DeliveryInfo
                restaurant={JSON.parse(JSON.stringify(restaurant))}
              />
              {/* Badge Infos */}
              <div className="mt-6 flex items-center gap-4 overflow-x-scroll md:grid md:grid-cols-2 [&::-webkit-scrollbar]:hidden">
                {restaurant.categories.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className="min-w-[150px] rounded-lg bg-white p-1 text-center text-sm"
                    >
                      <span className="text-sm font-semibold text-muted-foreground">
                        {category.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-[430px]:px-[1.25rem] md:grid md:grid-cols-1">
          {/* Mais Pedidos */}
          <div className="mt-6">
            <BadgeTitle title="Mais Pedidos" variant="noButton" href="" />
            <ProductList
              products={JSON.parse(JSON.stringify(restaurant.product))}
            />
          </div>
          {/* Mais Categorias */}
          <div className="mt-6">
            {restaurant.categories.map((category) => (
              <div key={category.id}>
                <BadgeTitle title={category.name} variant="noButton" href="" />
                <ProductList products={category.product} />
              </div>
            ))}
          </div>
        </div>
        <CartBanner restaurant={restaurant} />
      </div>
    </>
  )
}

export default RestaurantPage
