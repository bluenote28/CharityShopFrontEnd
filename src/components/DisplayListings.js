import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../actions/itemActions';
import ListingCard from './ListingCard';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListingFilter from '../utilities/FilterClass';
import formatItemsIntoRows from '../utilities/ItemsGridFormatter';
import NormalSpinner from './Spinner';

function DisplayListings(props) {

  const dispatch = useDispatch();
  const itemListing = useSelector((state) => state.items);
  const { error, loading, items } = itemListing
  const [ filteredItems, setFilteredItems ] = useState([])
  const [filteringItems, setFilteringItems ] = useState(true)

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
      setTimeout(()=> setFilteringItems(false), 1);     
    
    }, [items, props.charityId, props.category, props.search, loading])

  if (loading || filteringItems){
    return <NormalSpinner />
  }

  if (filteredItems.length == 0 && !loading){
      return <p style={{textAlign: 'center'}}>No items to display</p>
  }
  
  else{
  
      return (
        <>
            {   
                filteredItems.map((item, index) => { 
                    
                    return (
                    <div key={index}>        
                        {error ? <p>{error}</p>:
                        
                              <Row key={index}>

                                      {item.map(
                                          (item, index) => {
                                              return (
                                                  <Col key={index} className='mb-4'>
                                                      <ListingCard title={item.name} image={item.img_url} url={item.web_url}/>
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
        </>  
        )
  }
}

export default DisplayListings