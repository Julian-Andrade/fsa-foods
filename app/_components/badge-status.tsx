// Prisma
import { OrderStatus } from '@prisma/client'
// CVA
import { cva, type VariantProps } from 'class-variance-authority'
// Libs
import { cn } from '../_lib/utils'

const badgeVariants = cva(
  'flex w-fit items-center justify-center gap-1 rounded-lg bg-muted-foreground px-2 py-1 text-white',
  {
    variants: {
      variant: {
        PREPARING: 'bg-yellow-500',
        CONFIRMED: 'bg-orange-500',
        DELIVERING: 'bg-purple-500',
        CANCELED: 'bg-red-500',
        FINISHED: 'bg-green-500',
      },
    },
    defaultVariants: {
      variant: 'CONFIRMED',
    },
  },
)

interface BadgeStatusProps extends VariantProps<typeof badgeVariants> {
  orderStatus: OrderStatus
  className?: string
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PREPARING:
      return 'Preparando'
    case OrderStatus.CONFIRMED:
      return 'Confirmado'
    case OrderStatus.DELIVERING:
      return 'Entregue'
    case OrderStatus.CANCELED:
      return 'Cancelado'
    case OrderStatus.FINISHED:
      return 'Finalizado'
    default:
      return 'Aguardando pagamento'
  }
}

const BadgeStatus = ({ orderStatus, className, variant }: BadgeStatusProps) => {
  return (
    <div className={cn(badgeVariants({ variant, className }))}>
      <span className="text-sm font-bold">
        {getOrderStatusLabel(orderStatus)}
      </span>
    </div>
  )
}

export default BadgeStatus
