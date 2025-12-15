import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../actions/itemActions';
import ListingCard from './ListingCard';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListingFilter from '../utilities/FilterClass';
import formatItemsIntoRows from '../utilities/ItemsGridFormatter';
import NormalSpinner from './Spinner';
import Pagination from 'react-bootstrap/Pagination';

function DisplayListings(props) {

  const dispatch = useDispatch();
  const itemListing = useSelector((state) => state.items);
  const { error, loading, items } = itemListing
  const [ filteredItems, setFilteredItems ] = useState([])
  const [filteringItems, setFilteringItems ] = useState(true)
  const [page, setPage ] = useState(1)
  let paginationItems = [];
  const ITEMS_PER_PAGE = 48;

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  useEffect(() => {
      setFilteringItems(true)
    }, [props.charityId, props.category, props.search]);

  useEffect(() => {

      if (loading || !items) return;
      if (!Array.isArray(items)) return;
      const filter = new ListingFilter(items, props.charityId, props.category, props.search);
      filter.filterByAll();
      setFilteredItems(formatItemsIntoRows(filter.getItems()));
      setPage(1);
      setTimeout(()=> setFilteringItems(false), 1);     
    
    }, [items, props.charityId, props.category, props.search, loading])

  if (loading || filteringItems){
    return <NormalSpinner />
  }

  if (filteredItems.length == 0 && !loading){
      return <p style={{textAlign: 'center'}}>No items to display</p>
  }
  
  else{

      const totalPages = Math.ceil(filteredItems[0].length / ITEMS_PER_PAGE);

      for (let number = 1; number <= totalPages; number++) {
          paginationItems.push(<Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>{number}</Pagination.Item>);
      }

      const paginationItemsEnding = ITEMS_PER_PAGE * page;
      const paginationItemsBeginning = paginationItemsEnding - ITEMS_PER_PAGE;
      const paginatedItems = formatItemsIntoRows(filteredItems[0].slice(paginationItemsBeginning, paginationItemsEnding));
  
      return (
        <>

        <Pagination>{paginationItems}</Pagination>
            {   
                paginatedItems.map((item, index) => { 
                    
                    return (
                    <div key={index}>        
                        {error ? <p>{error}</p>:
                        
                              <Row key={index}>

                                      {item.map(
                                          (item, index) => {
                                              return (
                                                  <Col key={index} className='mb-4'>
                                                      <ListingCard title={item.name} image={item.img_url} url={item.web_url} id={item.ebay_id} type={'normal'}/>
                                                  </Col>
                                              )
                                          }
                                      )}
                              </Row>
                         }
                    </div>
                    )
                })
            }

        <Pagination>{paginationItems}</Pagination>
            
        </>  
        )
  }
}

export default DisplayListings