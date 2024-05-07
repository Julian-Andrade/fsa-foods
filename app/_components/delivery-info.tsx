// Prisma
import { Restaurant } from '@prisma/client'
// Components
import { Card } from './ui/card'
// Icon
import { BikeIcon, TimerIcon } from 'lucide-react'
// Helpers
import { formatCurrencyToBrazil } from '../_helpers/price'

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <div>
      {/* Informações de Entrega */}
      <Card className="mt-6 border border-muted-foreground bg-[#ececec] p-5">
        <div className="flex justify-around">
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1 text-sm text-muted-foreground">
              Frete
              <BikeIcon size={18} />
            </div>
            <div>
              {Number(restaurant.deliveryFee) === 0 ? (
                <span className="text-xs font-bold">Entrega Grátis</span>
              ) : (
                <span className="text-xs font-bold">
                  {formatCurrencyToBrazil(Number(restaurant.deliveryFee))}
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
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DeliveryInfo
