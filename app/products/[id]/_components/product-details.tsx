'use client'

// React
import { useState } from 'react'
// Next
import Image from 'next/image'
// Prisma
import { Prisma } from '@prisma/client'
// Components
import BadgeDiscount from '@/app/_components/badge-discount'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
// Helpers
import {
  calculateProductTotalPrice,
  formatCurrencyToBrazil,
} from '@/app/_helpers/price'
// Icons
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from 'lucide-react'
import ProductList from '@/app/_components/product-list'

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [productQuantity, setProductQuantity] = useState(1)

  const handleIncreaceProductQuantity = () => {
    setProductQuantity((state) => state + 1)
  }

  const handleDecreaseProductQuantity = () => {
    setProductQuantity((state) => {
      if (state === 1) {
        return 1
      }
      return state - 1
    })
  }

  return (
    <div className="p-5">
      {/* Produto */}
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="text-xl font-bold">{product.name}</h1>

      {/* Preço c/ Desconto */}
      <div className="mt-4 flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              {calculateProductTotalPrice(product)}
            </h2>
            {product.discountPercentage > 0 && (
              <BadgeDiscount product={product} />
            )}
          </div>

          {/* Preço Original */}
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground line-through">
              De: {formatCurrencyToBrazil(Number(product.price))}
            </p>
          )}
        </div>

        {/* Quantidade */}
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant={'ghost'}
            className="border border-muted-foreground"
            onClick={handleDecreaseProductQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{productQuantity}</span>
          <Button size="icon" onClick={handleIncreaceProductQuantity}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* Informações de Entrega */}
      <Card className="mt-6 border border-muted-foreground bg-[#ececec] p-5">
        <div className="flex justify-around">
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1 text-sm text-muted-foreground">
              Frete
              <BikeIcon size={18} />
            </div>
            <div>
              {Number(product.restaurant.deliveryFee) === 0 ? (
                <span className="text-xs font-bold">Entrega Grátis</span>
              ) : (
                <span className="text-xs font-bold">
                  {formatCurrencyToBrazil(
                    Number(product.restaurant.deliveryFee),
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1 text-sm text-muted-foreground">
              Entrega
              <TimerIcon size={18} />
            </div>
            <div>
              <span className="text-xs font-bold">
                {product.restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Descrição do Produto */}
      <div className="flex flex-col gap-2">
        <h3 className="mt-6 font-bold">Descrição</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      {/* Outra Categoria */}
      <div className="flex flex-col gap-2">
        <h3 className="mt-6 font-bold">Bebidas</h3>
        <p className="text-sm text-muted-foreground">
          Adicione uma bebida ao seu pedido
        </p>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  )
}

export default ProductDetails
