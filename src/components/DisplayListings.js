import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getItems } from '../utilities/BackEndClient';
import Row from 'react-bootstrap/esm/Row';
import ListingFilter from '../utilities/FilterClass';
import NormalSpinner from './Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { Container } from 'react-bootstrap';
import ItemListing from './ItemListing'
import { useQuery } from '@tanstack/react-query'


function DisplayListings(props) {
  const [ filteredItems, setFilteredItems ] = useState([])
  const [filteringItems, setFilteringItems ] = useState(true)
  const [page, setPage ] = useState(1)
  const ITEMS_PER_PAGE = 48;
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;


 const { isPending, isError, data, error } = useQuery({
    queryKey: [`${[props.search]}${props.subCategory}`],
    queryFn: () => getItems(null, props.search, props.subCategory),
  })

  useEffect(() => {
      setFilteringItems(true)
    }, [props.charityId, props.subCategory]);

  useEffect(() => {

      if (isPending || !data) return;
      if (!Array.isArray(data)) return;
      const filter = new ListingFilter(data, props.charityId, props.category, props.subCategory);
      filter.filterByAll();
      setFilteredItems(filter.getItems());
      setPage(1);
      setTimeout(()=> setFilteringItems(false), 1);     
    
    }, [data, props.charityId, props.category,props.subCategory, isPending])

  if (isPending || filteringItems){
    return <NormalSpinner />
  }

  if (filteredItems.length === 0 && !isPending){
      return <p style={{textAlign: 'center'}}>No items to display</p>
  }
  
  else{
    
      const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
      const paginationItemsEnding = ITEMS_PER_PAGE * page;
      const paginationItemsBeginning = paginationItemsEnding - ITEMS_PER_PAGE;
      const paginatedItems = filteredItems.slice(paginationItemsBeginning, paginationItemsEnding);
      const prevPaginationItems = [<Pagination.First onClick={() => {setPage(1); window.scrollTo({ top: 0, behavior: 'instant' });}} />, 
      <Pagination.Prev onClick={()=>{
        if(page === 1){
          return;
        }
        else{
          setPage(page - 1);
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      
      } />];
      const nextPaginationItems = [<Pagination.Next onClick={()=>{

        if(page === totalPages){
          return;
        }
        else{
          setPage(page + 1);
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      }  />, <Pagination.Last onClick={() => {setPage(totalPages); window.scrollTo({ top: 0, behavior: 'instant' });}} />];
  
      return (
        <>          
        <Container>
            {   
                paginatedItems.map((item, index) => { 

                    return (
                    <div key={index}>        
                        {error ? <p>{error}</p>:
                          <Row key={index} className='mb-3'>
                                <ItemListing title={item.name} image={item.img_url} url={item.web_url} id={item.ebay_id} price={item.price} charity={item.charity} />
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