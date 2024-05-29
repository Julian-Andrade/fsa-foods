'use client'

// React
import { useContext } from 'react'
// Next
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// Context
import { CartContext } from '@/app/_context/cart'
// Prisma
import { Card, CardContent } from '@/app/_components/ui/card'
import { Prisma } from '@prisma/client'
// Components
import BadgeStatus from '@/app/_components/badge-status'
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import { Separator } from '@/app/_components/ui/separator'
// Helpers
import { formatCurrencyToBrazil } from '@/app/_helpers/price'

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true
      products: {
        include: {
          product: true
        }
      }
    }
  }>
}

const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCart } = useContext(CartContext)

  const router = useRouter()

  const handleReOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      })
    }

    router.push(`/restaurants/${order.restaurantId}`)
  }

  return (
    <Card className="mb-2">
      <CardContent className="p-5">
        <BadgeStatus orderStatus={order.status} />

        <div className="flex items-center justify-between py-2">
          <div className="mt-2 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={order.restaurant.imageUrl}
                alt={order.restaurant.name}
              />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-transparent hover:text-primary"
          >
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground text-sm text-white">
                <span>{product.quantity}</span>
              </div>
              <span>{product.product.name}</span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p>{formatCurrencyToBrazil(Number(order.totalPrice))}</p>

          <Button
            variant="ghost"
            className="font-bold text-primary"
            disabled={order.status !== 'CONFIRMED'}
            onClick={handleReOrderClick}
          >
            Refazer o pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderItem
