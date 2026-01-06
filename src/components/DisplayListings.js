import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { getUserFavorites } from '../actions/userActions';
import Row from 'react-bootstrap/esm/Row';
import ListingFilter from '../utilities/FilterClass';
import NormalSpinner from './Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { Container } from 'react-bootstrap';
import ItemListing from './ItemListing'
import { getCharities } from '../actions/charityActions';

function DisplayListings(props) {

  const dispatch = useDispatch();
  const itemListing = useSelector((state) => state.items);
  const favoritesData = useSelector((state) => state.favorites);
  const { favoritesError, favoritesLoading, favorites } = favoritesData
  const { error, loading, items } = itemListing
  const [ filteredItems, setFilteredItems ] = useState([])
  const [filteringItems, setFilteringItems ] = useState(true)
  const [page, setPage ] = useState(1)
  const ITEMS_PER_PAGE = 48;
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  useEffect(() => {
   
    if (props.search == null){
      console.log(props.category)
      dispatch(getItems(null, null, props.category))
    }

    if (props.category == null){
      dispatch(getItems(null, props.search, null))
    }

    if (userInfo != null && (!favorites || favorites.length === 0)){
      dispatch(getUserFavorites())
    }

    dispatch(getCharities());
   
  }, [dispatch]);

  useEffect(() => {
      setFilteringItems(true)
    }, [props.charityId, props.category]);

  useEffect(() => {

      if (loading || !items) return;
      if (!Array.isArray(items)) return;
      const filter = new ListingFilter(items, props.charityId, props.category);
      filter.filterByAll();
      setFilteredItems(filter.getItems());
      setPage(1);
      setTimeout(()=> setFilteringItems(false), 1);     
    
    }, [items, props.charityId, props.category, loading])

  if (loading || filteringItems || (!favorites && userInfo != null)){
    return <NormalSpinner />
  }

  if (filteredItems.length == 0 && !loading){
      return <p style={{textAlign: 'center'}}>No items to display</p>
  }
  
  else{

      const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
      const paginationItemsEnding = ITEMS_PER_PAGE * page;
      const paginationItemsBeginning = paginationItemsEnding - ITEMS_PER_PAGE;
      const paginatedItems = filteredItems.slice(paginationItemsBeginning, paginationItemsEnding);
      const prevPaginationItems = [<Pagination.First onClick={() => setPage(1)} />, <Pagination.Prev onClick={()=>{

        if(page == 1){
          return;
        }
        else{
          setPage(page - 1);
        }

      }
      } />];
      const nextPaginationItems = [<Pagination.Next onClick={()=>{

        if(page == totalPages){
          return;
        }
        else{
          setPage(page + 1);
        }

      }
      }  />, <Pagination.Last onClick={() => setPage(totalPages)} />];
  
      return (
        <>
        <Container className='d-flex justify-content-center'>
            <Pagination>{prevPaginationItems}<Pagination.Item>{page}</Pagination.Item><Pagination.Item>of</Pagination.Item><Pagination.Item>{totalPages}</Pagination.Item>{nextPaginationItems}</Pagination>
        </Container>
          
        <Container>
            {   
                paginatedItems.map((item, index) => { 

                    return (
                    <div key={index}>        
                        {error ? <p>{error}</p>:
                              <Row key={index} className='mb-3'>
                                {favorites ?
                                    <ItemListing title={item.name} image={item.img_url} url={item.web_url} id={item.ebay_id} price={item.price} favorites={favorites.items} charity={item.charity} /> :      
                                    <ItemListing title={item.name} image={item.img_url} url={item.web_url} id={item.ebay_id} price={item.price} charity={item.charity} />
                                }
                              </Row>
                         }
                    </div>
                    )
                })
            }
        </Container>

        <Container className='d-flex justify-content-center'>
            <Pagination>{prevPaginationItems}<Pagination.Item>{page}</Pagination.Item><Pagination.Item>of</Pagination.Item><Pagination.Item>{totalPages}</Pagination.Item>{nextPaginationItems}</Pagination>
        </Container>
            
        </>  
        )
  }
}

export default DisplayListings