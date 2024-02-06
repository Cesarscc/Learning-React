import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'
import { useUsers } from './hooks/useUsers'



function App() {


  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  //const [loading, setLoading] = useState(false)
  //const [error, setError] = useState(false)
  //const [currentPage, setCurrentPage] = useState(1)

  // const originalUsers = useRef<User[]>([])
  // useRef -> para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    return refetch()
    //setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {

    const position = users.map((user) => user.email).indexOf(email)

  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  /* useEffect(() => {
    setLoading(true)
    setError(false)
   
    fetchUsers(currentPage)
      .then(users => {
        setUsers(prevUsers => {
          const newUsers = prevUsers.concat(users)
          originalUsers.current = newUsers
          return newUsers
        })
   
      })
      .catch(err => {
        setError(err)
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage]) */

  const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers')
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('calculate sortedUsers')

    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear files
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>

        <button onClick={handleReset}>
          Resetear estado
        </button>

        <input placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />

      </header>
      <main>
        {users.length > 0 &&
          <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />}
        {isLoading && <p>Cargando... </p>}
        {isError && <p>Ha ocurrido un error inesperado...</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios que mostrar...</p>}

        {!isLoading && !isError && hasNextPage && <button onClick={() => fetchNextPage()}>Cargas más resultados</button>}

        {!isLoading && !isError && !hasNextPage && <p>No hay más resultados...</p>}
      </main>
    </div>
  )
}

export default App