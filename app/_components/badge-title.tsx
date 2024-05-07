// Next
import Link from 'next/link'
// Components
import { Button } from './ui/button'
// Icon
import { ChevronRight } from 'lucide-react'
// Utils
import { cn } from '../_lib/utils'

interface BadgeTitleProps {
  title?: string
  variant?: 'button' | 'noButton'
  href: string
  nameButton?: string
  className?: string
}

const BadgeTitle = ({
  title,
  variant,
  href,
  nameButton,
  className,
}: BadgeTitleProps) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <h2 className="gap-1 font-bold">{title}</h2>
      {variant === 'button' ? (
        <Link href={href}>
          <Button
            className="flex h-0 items-center p-0 text-primary hover:bg-transparent"
            variant={'ghost'}
          >
            {nameButton}
            <ChevronRight size={16} />
          </Button>
        </Link>
      ) : (
        ''
      )}
    </div>
  )
}

export default BadgeTitle
