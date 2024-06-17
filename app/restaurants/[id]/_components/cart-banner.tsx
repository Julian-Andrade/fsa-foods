'use client'

// React
import { useContext, useState } from 'react'
// Context
import { CartContext } from '@/app/_context/cart'
// Prisma
import { Restaurant } from '@prisma/client'
// Helpers
import { formatCurrencyToBrazil } from '@/app/_helpers/price'
// Components
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import Cart from '@/app/_components/cart'

interface CartBannerProps {
  restaurant: Pick<Restaurant, 'id'>
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { products, totalPrice, totalQuantity } = useContext(CartContext)

  const restaurantHasProductOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  )

  if (!restaurantHasProductOnCart) return null

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3">
      <div className="flex items-center justify-between md:ml-[-1.25rem] md:justify-normal md:gap-6 md:px-[1.25rem]">
        {/* Preço */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-bold">
            {formatCurrencyToBrazil(totalPrice)}
            <span className="text-xs font-normal text-muted-foreground">
              {' '}
              / {totalQuantity} item(s)
            </span>
          </h3>
        </div>

        {/* Botão */}
        <Button className="md:w-44" onClick={() => setIsCartOpen(true)}>
          Ver sacola
        </Button>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-[80vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default CartBanner
