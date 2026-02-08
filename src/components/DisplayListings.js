import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getItems } from '../utilities/BackEndClient';
import Row from 'react-bootstrap/esm/Row';
import NormalSpinner from './Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { Container } from 'react-bootstrap';
import ItemListing from './ItemListing'
import { useQuery } from '@tanstack/react-query'

function DisplayListings(props) {
  const [page, setPage ] = useState(1)
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  useEffect(()=>{setPage(1)}, [props.subCategory, props.search, props.filter])

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`${[props.search]}${props.subCategory}${props.filter}${page}`],
    queryFn: () => getItems(null, props.search, props.subCategory, props.filter, page),
  })

  if (isPending){
    return <NormalSpinner />
  }

  if (data.results.length === 0 && !isPending){
      return <p style={{textAlign: 'center'}}>No items to display</p>
  }
  
  else{

      const numOfPages = Math.ceil(data.count / 50)
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
        setPage(page + 1);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }} />,   <Pagination.Last onClick={()=> setPage(numOfPages)}/>];
  
      return (
        <>          
        <Container>
            {   
              data.results.map((item, index) => { 
                  return (
                  <div key={index}>        
                      {error ? <p>{error}</p>:
                        <Row key={index} className='mb-3'>
                          <ItemListing
                          name={item.name} 
                          img_url={item.img_url} 
                          url={item.web_url} 
                          id={item.ebay_id} 
                          price={item.price} 
                          charity={item.charity}
                          additional_images={item.additional_images} 
                          shippingPrice={item.shipping_price}
                          condition={item.condition}
                          seller={item.seller} />
                        </Row>
                      }
                  </div>
                )
              })
            }
        </Container>

        <Container className='d-flex justify-content-center'>
           {numOfPages > 1 && (
            <>
              {page > 1 && <Pagination>{prevPaginationItems}</Pagination>}
      
              <div className='d-flex mx-2 mt-1'>
                Page {page} of {numOfPages}
              </div>
              
              {page < numOfPages && <Pagination>{nextPaginationItems}</Pagination>}
            </>
          )}
        </Container>
            
        </>  
        )
  }
}

export default DisplayListings