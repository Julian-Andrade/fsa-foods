// Next
import Image from 'next/image'
import Link from 'next/link'
// Components
import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className="flex justify-between pt-6">
      <Link href="/">
        <Image src="/logo.png" alt="FSA Foods" height={30} width={120} />
      </Link>
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
