'use client'

// Next
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
// Prisma
import { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
// Components
import { Button } from '@/app/_components/ui/button'
import { toast } from 'sonner'
// Icons
import { ChevronLeft, HeartIcon } from 'lucide-react'
// Hooks
import useToggleFavoriteRestaurant from '@/app/_hooks/use-toggle-favorite-restaurants'
// Helpers
import { isRestaurantFavorited } from '@/app/_helpers/user-favorited-restaurants'

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'id' | 'name' | 'imageUrl'>
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession()

  const router = useRouter()

  const handleBackClick = () => router.back()

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  )

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
    onSuccess: () =>
      toast(
        isFavorite
          ? 'Restaurante removido dos favoritos.'
          : 'Restaurante favoritado.',
        {
          action: {
            label: 'Ver Favoritos',
            onClick: () => router.push('/my-favorite-restaurants'),
          },
        },
      ),
    onError: () =>
      toast.error('Houve um erro ao tentar favoritar o restaurante.'),
  })

  return (
    <div className="relative h-[215px] w-full md:h-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover md:rounded-lg"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white md:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeft />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-muted-foreground p-2 text-white ${isFavorite && 'bg-primary hover:bg-black'}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={16} className="fill-white" />
      </Button>
    </div>
  )
}

export default RestaurantImage
