// React
import { useContext } from 'react'
// Contexts
import { CartContext } from '../_context/cart'
// Components
import CartItem from './cart-item'
import { Card, CardContent } from './ui/card'
// Helpers
import { formatCurrencyToBrazil } from '../_helpers/price'
import { Separator } from '@radix-ui/react-separator'
import { Button } from './ui/button'

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext)
  return (
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
                <span>- {formatCurrencyToBrazil(totalDiscount)}</span>
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
          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <h2 className="text-muted-foreground">
          Não possui itens adicionado à sacola
        </h2>
      )}
    </div>
  )
}

export default Cart
