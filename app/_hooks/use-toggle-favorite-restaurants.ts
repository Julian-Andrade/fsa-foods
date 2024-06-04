// import { toast } from 'sonner'
import { toggleFavoriteRestaurant } from '../_actions/restaurant'

interface useToggleFavoriteRestaurantProps {
  userId?: string
  restaurantId: string
  restaurantIsFavorited?: boolean
  onSuccess?: () => void
  onError?: () => void
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  // eslint-disable-next-line no-unused-vars
  restaurantIsFavorited,
  onSuccess,
  onError,
}: useToggleFavoriteRestaurantProps) => {
  const handleFavoriteClick = async () => {
    if (!userId) return

    try {
      await toggleFavoriteRestaurant(userId, restaurantId)
      onSuccess?.()
    } catch (error) {
      onError?.()
    }
  }

  return { handleFavoriteClick }
}

export default useToggleFavoriteRestaurant
