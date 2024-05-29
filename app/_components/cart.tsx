// React
import { useContext, useState } from 'react'
// Next
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
// Contexts
import { CartContext } from '../_context/cart'
// Components
import CartItem from './cart-item'
import { Card, CardContent } from './ui/card'
import { toast } from 'sonner'
// Helpers
import { formatCurrencyToBrazil } from '../_helpers/price'
import { Separator } from '@radix-ui/react-separator'
import { Button } from './ui/button'
// Actions
import { createOrder } from '../_actions/order'
// Prisma
import { OrderStatus } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void
}

const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter()

  const [isSubmitingLoading, setIsSubmitingLoading] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const { data } = useSession()

  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext)

  const handleFinishedOrder = async () => {
    if (!data?.user) return

    const restaurant = products[0].restaurant

    try {
      setIsSubmitingLoading(true)

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data?.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      })

      clearCart()
      setIsOpen(false)

      toast('Pedido realizado com sucesso', {
        description: 'Acompanhe os pedidos realizados através dos seus pedidos',
        action: {
          label: 'Meus pedidos',
          onClick: () => router.push('/my-orders'),
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitingLoading(false)
    }

    clearCart()
  }

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>

            {/* Totais */}
            <Card className="mt-6">
              <CardContent className="space-y-3 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrencyToBrazil(subtotalPrice)}</span>
                </div>

                <Separator className="h-[1px] bg-[#EEEEEE]" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Entrega</span>
                  <span>
                    {Number(products[0]?.restaurant.deliveryFee) === 0 ? (
                      <span className="font-semibold uppercase text-primary">
                        Grátis
                      </span>
                    ) : (
                      formatCurrencyToBrazil(
                        Number(products[0]?.restaurant.deliveryFee),
                      )
                    )}
                  </span>
                </div>

                <Separator className="h-[1px] bg-[#EEEEEE]" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Descontos</span>
                  <span>- {formatCurrencyToBrazil(totalDiscounts)}</span>
                </div>

                <Separator className="h-[1px] bg-[#EEEEEE]" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-md font-bold">Total</span>
                  <span className="text-md font-bold">
                    {formatCurrencyToBrazil(totalPrice)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Botão de Finalizar Compra */}
            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitingLoading}
            >
              Finalizar pedido
            </Button>
          </>
        ) : (
          <h2 className="text-muted-foreground">
            Não possui itens adicionado à sacola
          </h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja realmente finalizar o pedido?
            </AlertDialogTitle>
            <AlertDialogDescription>
              O pedido será enviado ao restaurante quando clicar em confirmar o
              pedido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishedOrder}
              disabled={isSubmitingLoading}
            >
              {isSubmitingLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Cart
