// Components
import { Button } from './ui/button'
// Icon
import { ChevronRight } from 'lucide-react'

interface BadgeTitleProps {
  title?: string
  variant?: 'button' | 'noButton'
}

const BadgeTitle = ({ title, variant }: BadgeTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="gap-1 font-bold">{title}</h2>
      {variant === 'button' ? (
        <Button
          className="flex h-0 items-center p-0 text-primary hover:bg-transparent"
          variant={'ghost'}
        >
          Ver todos
          <ChevronRight size={16} />
        </Button>
      ) : (
        ''
      )}
    </div>
  )
}

export default BadgeTitle
