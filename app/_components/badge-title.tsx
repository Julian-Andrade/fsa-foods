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
        <Button
          className="flex h-0 items-center p-0 text-primary hover:bg-transparent"
          variant={'ghost'}
          asChild
        >
          <Link href={href}>
            {nameButton}
            <ChevronRight size={16} />
          </Link>
        </Button>
      ) : (
        ''
      )}
    </div>
  )
}

export default BadgeTitle
