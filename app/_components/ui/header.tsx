import Image from 'next/image'

// Components
import { MenuIcon } from 'lucide-react'
import { Button } from './button'

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
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
