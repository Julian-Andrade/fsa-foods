// Components
import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'

// Next
import Image from 'next/image'

const Header = () => {
  return (
    <div className="flex justify-between pt-6">
      <Image src="/logo.png" alt="FSA Foods" height={30} width={120} />
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  )
}

export default Header
