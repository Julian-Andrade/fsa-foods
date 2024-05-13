// React
import { useContext } from 'react'
// Next
import Image from 'next/image'
// Type
import { CartContext, CartProduct } from '../_context/cart'
// Helpers
import {
  calculateProductTotalPrice,
  formatCurrencyToBrazil,
} from '../_helpers/price'
// Icons
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react'
// Components
import { Button } from './ui/button'

interface CartItemProps {
  cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductCartQuantity,
    increaseProductCartQuantity,
    removeProductFromCart,
  } = useContext(CartContext)

  const handleDecreaseCartProductQuantity = () => {
    decreaseProductCartQuantity(cartProduct.id)
  }

  const handleIncreaseCartProductQuantity = () => {
    increaseProductCartQuantity(cartProduct.id)
  }

  const handleRemoveCartProduct = () => {
    removeProductFromCart(cartProduct.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Imagem */}
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* Descrição e Quantidade */}
        <div className="space-y-1">
          <h3 className="text-xs font-semibold">{cartProduct.name}</h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {formatCurrencyToBrazil(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </span>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrencyToBrazil(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-center">
            <Button
              size="icon"
              variant={'ghost'}
              className="h-8 w-8 border border-muted-foreground"
              onClick={handleDecreaseCartProductQuantity}
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="w-4 text-sm">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseCartProductQuantity}
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Botão de Excluir */}
      <Button
        size="icon"
        variant={'ghost'}
        className="h-8 w-8 border border-muted-foreground"
        onClick={handleRemoveCartProduct}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  )
}

export default CartItem
