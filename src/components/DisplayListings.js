import { useSelector } from 'react-redux';
import { getItems } from '../utilities/BackEndClient';
import Row from 'react-bootstrap/esm/Row';
import NormalSpinner from './Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { Container } from 'react-bootstrap';
import ItemListing from './ItemListing'
import { useQuery } from '@tanstack/react-query'
import AlertBox from './Alert';
import { useSearchParams } from 'react-router-dom';

function DisplayListings(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get('page'), 10) || 1);
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  function goToPage(nextPage) {
    const params = new URLSearchParams(searchParams);
    if (nextPage <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(nextPage));
    }
    setSearchParams(params, { replace: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`${props.search}${props.subCategory}${props.filter}${props.charityId}${page}`],
    queryFn: () => getItems(null, props.search, props.subCategory, props.filter, page, props.charityId),
  })

  if (isPending){
    return <NormalSpinner />
  }

  if (isError){ 
      return <AlertBox message={error} />
  }

  if (data.results.length === 0 && !isPending){
      return <p style={{textAlign: 'center'}}>No items to display</p>
  }
  
  else{

      const numOfPages = Math.ceil(data.count / 50)
      const prevPaginationItems = [<Pagination.First onClick={() => goToPage(1)} />, 
      <Pagination.Prev onClick={()=>{
        if(page === 1){
          return;
        }
        else{
          goToPage(page - 1);
        }
      }
      
      } />];
      const nextPaginationItems = [<Pagination.Next onClick={()=>{
        goToPage(page + 1);
      }} />,   <Pagination.Last onClick={()=> goToPage(numOfPages)}/>];
  
      return (
        <>          
        <Container className="px-2 px-sm-3">
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
                          seller={item.seller}
                          donation_percentage={item.donation_percentage}
                          seller_description={item.seller_description} />
                        </Row>
                      }
                  </div>
                )
              })
            }
        </Container>

        <Container className='d-flex justify-content-center align-items-center flex-wrap px-2'>
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
