import DisplayListings from '../components/DisplayListings'
import { useSearchParams } from 'react-router-dom';
import FavoriteCharitiesFilter from '../components/FavoriteCharitiesFilter'

function SearchPage() {
  
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search')

  return (
    <>

    <h1 className='text-center mb-3 mt-3'>Search Results for: {searchText}</h1>
    <div className="d-flex justify-content-center mb-4">
      <FavoriteCharitiesFilter />
    </div>
    <DisplayListings search={searchText} />
       
    </> 
  )
}

export default SearchPage
