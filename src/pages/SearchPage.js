import DisplayListings from '../components/DisplayListings'
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search')

  return (
    <>

    <h1 className='text-center mb-5 mt-3'>Search Results for: {searchText}</h1>
    <DisplayListings search={searchText} />
       
    </> 
  )
}

export default SearchPage