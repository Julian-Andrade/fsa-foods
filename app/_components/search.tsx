'use client'

// React
import { FormEventHandler, useState } from 'react'
// Next
import { useRouter } from 'next/navigation'
// Components
import { Button } from './ui/button'
import { Input } from './ui/input'
// Icon
import { SearchIcon } from 'lucide-react'

const Search = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!search) {
      return
    }

    router.push(`/restaurants?search=${search}`)
  }

  return (
    <form className="flex gap-2 pt-6" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleSearch}
        value={search}
      />
      <Button size="icon" type="submit">
        <SearchIcon size={18} />
      </Button>
    </form>
  )
}

export default Search
