// Next
import Image from 'next/image'
// Prisma
import { Restaurant } from '@prisma/client'
// Icon
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from 'lucide-react'
// Helper
import { formatCurrencyToBrazil } from '../_helpers/price'
// Component
import { Button } from './ui/button'

interface RestaurantItemProps {
  restaurant: Restaurant
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="mb-6 rounded-lg object-cover"
          sizes="100vw"
          quality={100}
        />

        {/* TODO: Create a Badge Card component */}
        <div className="absolute left-2 top-3 flex items-center justify-center gap-1  rounded-lg bg-white px-2 py-1">
          <StarIcon className="fill-amber-400 text-amber-400" size={16} />
          <span className="text-xs font-bold">5.0</span>
        </div>

        <Button className="absolute right-2 top-2 h-7 w-7 rounded-full bg-muted-foreground p-2 text-white">
          <HeartIcon size={16} className="fill-white" />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-bold">{restaurant.name}</h3>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <BikeIcon className="text-primary" size={18} />
          <div className="flex items-center gap-1">
            {Number(restaurant.deliveryFee) > 0 ? (
              <span>
                {formatCurrencyToBrazil(Number(restaurant.deliveryFee))}
              </span>
            ) : (
              <span>Entrega Grátis</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TimerIcon className="text-primary" size={18} />
            {restaurant.deliveryTimeMinutes} min
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantItem
