// Components
import { Button } from './ui/button'
import { Input } from './ui/input'
// Icon
import { SearchIcon } from 'lucide-react'

const Search = () => {
  return (
    <div className="flex gap-2 pt-6">
      <Input placeholder="Buscar restaurantes" className="border-none" />
      <Button size="icon">
        <SearchIcon size={18} />
      </Button>
    </div>
  )
}

export default Search
