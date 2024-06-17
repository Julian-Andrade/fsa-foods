'use client'

// Next
import Image from 'next/image'
import { useRouter } from 'next/navigation'
// Prisma
import { Product } from '@prisma/client'
// Components
import { Button } from '@/app/_components/ui/button'
// Icons
import { ChevronLeft } from 'lucide-react'

interface ProductImageProps {
  product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter()

  const handleBackClick = () => router.back()

  return (
    <div className="relative h-[360px] w-full md:h-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
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
    </div>
  )
}

export default ProductImage
