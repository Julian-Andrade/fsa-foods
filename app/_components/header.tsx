'use client'

// Next
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
// Components
import {
  HeartIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import Search from './search'

interface HeaderProps {
  isSearchBar?: boolean
}

const Header = ({ isSearchBar }: HeaderProps) => {
  const { data, status } = useSession()

  const pathname = usePathname()

  const handleSignIn = () => {
    signIn()
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="flex justify-between pb-6 pt-6 min-[420px]:px-5 md:border-b md:border-solid md:border-b-zinc-300 md:px-5">
      <Link href="/">
        <Image src="/logo.png" alt="FSA Foods" height={30} width={120} />
      </Link>

      {isSearchBar && (
        <div className="hidden w-1/2 md:block">
          <Search />
        </div>
      )}

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
            asChild
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {status === 'authenticated' ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 pt-6">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(' ')[0][0]}
                      {data?.user?.name?.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-6">
                <h2 className="font-semibold">Olá, Faça seu login.</h2>
                <Button onClick={handleSignIn}>Login</Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-3">
            <Button
              variant="ghost"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span className="block">Início</span>
              </Link>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className={`nav-link ${pathname === '/my-orders' ? 'active' : ''}`}
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className={`nav-link ${pathname === '/my-favorite-restaurants' ? 'active' : ''}`}
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes Favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full"
                onClick={handleSignOut}
              >
                <LogOutIcon size={16} />
                <span className="block">Sair da conta</span>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Header
