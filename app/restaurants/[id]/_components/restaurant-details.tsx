// Next
import Image from 'next/image'
// Prisma
import { Restaurant } from '@prisma/client'
// Icons
import { StarIcon } from 'lucide-react'
// Helpers
import DeliveryInfo from '@/app/_components/delivery-info'

interface RestaurantDetailsProps {
  restaurant: Restaurant
}

const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
  return (
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
          <StarIcon className="fill-amber-400 text-amber-400" size={16} />
          <span className="text-xs font-bold">5.0</span>
        </div>
      </div>

      {/* Informações de Entrega */}
      <DeliveryInfo restaurant={restaurant} />

      {/* Badge Infos */}
      <div></div>
    </div>
  )
}

export default RestaurantDetails
