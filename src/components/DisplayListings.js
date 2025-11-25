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

      if (items && items.length > 0) {
          const filter = new ListingFilter(items);
          setFilteringItems(true)
          filterItems(filter).then(() => {
            setFilteredItems(formatItemsIntoRows(filter.getItems()))
            setFilteringItems(false)
          })
      }
    
    }, [items, props.charityId, props.category, props.search])

  async function filterItems(filter){

      if(props.charityId != null){
        filter.filterByCharity(props.charityId);

      }

      if (props.category != null){
        filter.filterByCategory(props.category);
      }

      if (props.search != null){
        filter.filterBySearch(props.search);
      }
  }

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
                    <>        
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
                    </>
                    )
                })
            }      
        </>  
        )
  }
}

export default DisplayListings