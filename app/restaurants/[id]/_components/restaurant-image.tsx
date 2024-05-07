'use client'

// Next
import Image from 'next/image'
import { useRouter } from 'next/navigation'
// Prisma
import { Restaurant } from '@prisma/client'
// Components
import { Button } from '@/app/_components/ui/button'
// Icons
import { ChevronLeft, HeartIcon } from 'lucide-react'

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter()

  const handleBackClick = () => router.back()

  return (
    <div className="relative h-[215px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeft />
      </Button>

      <Button
        size="icon"
        className="absolute right-4 top-4 rounded-full bg-muted-foreground p-2 text-white"
      >
        <HeartIcon size={16} className="fill-white" />
      </Button>
    </div>
  )
}

export default RestaurantImage
