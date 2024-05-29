'use client'

// React
import { useContext, useState } from 'react'
// Next
import Image from 'next/image'
// Contexts
import { CartContext } from '@/app/_context/cart'
// Prisma
import { Prisma } from '@prisma/client'
// Components
import BadgeDiscount from '@/app/_components/badge-discount'
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import Cart from '@/app/_components/cart'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog'
// Helpers
import {
  calculateProductTotalPrice,
  formatCurrencyToBrazil,
} from '@/app/_helpers/price'
// Icons
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import ProductList from '@/app/_components/product-list'
import DeliveryInfo from '@/app/_components/delivery-info'

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
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false)

  const { addProductToCart, products } = useContext(CartContext)

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, quantity, emptyCart })

    setIsCartOpen(true)
  }

  const handleAddToCart = () => {
    // Verifica se há algum produto de outro restaurante no carrinho
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    )

    // Se houver algum produto, abrir um aviso
    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true)
    }

    addToCart({
      emptyCart: false,
    })
  }

  const handleIncreaceProductQuantity = () => {
    setQuantity((state) => state + 1)
  }

  const handleDecreaseProductQuantity = () => {
    setQuantity((state) => {
      if (state === 1) {
        return 1
      }
      return state - 1
    })
  }

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-[#ececec] p-5">
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
                {formatCurrencyToBrazil(calculateProductTotalPrice(product))}
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
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleIncreaceProductQuantity}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* Informações de Entrega */}
        <DeliveryInfo restaurant={product.restaurant} />

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

        {/* Botão de Adicionar à sacola */}
        <div className="mt-6">
          <Button className="w-full font-semibold" onClick={handleAddToCart}>
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[80vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja realmente adicionar o produto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Caso escolha adicionar produto de restaurante diferente,
              acarretará na criação de uma nova sacola referente ao restaurante
              escolhido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ProductDetails
