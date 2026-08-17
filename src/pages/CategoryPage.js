import DisplayListings from '../components/DisplayListings'
import { Row, Col, Container, Button, ButtonGroup } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { FILTER_OPTIONS } from '../constants/categoryFilterOptions'
import formatItemsIntoRows from '../utilities/ItemsGridFormatter'

function CategoryPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category')
  const subCategory = searchParams.get('subCategory')
  const filter = searchParams.get('filter')
  const CATEGORY_BUTTON_GROUP_PER_ROW = 5;
  const subCategoryOptions = formatItemsIntoRows(FILTER_OPTIONS[category], CATEGORY_BUTTON_GROUP_PER_ROW)

  function selectSubCategory(item) {
    const params = { category };
    if (item.subCategory) {
      params.subCategory = item.subCategory;
    }
    if (item.filter) {
      params.filter = item.filter;
    }
    setSearchParams(params);
  }

  function isSelected(item) {
    if (item.subCategory !== subCategory) {
      return false;
    }
    return (item.filter || null) === (filter || null);
  }

  function subCategoryBar(){

    return (
      subCategoryOptions?.map((item, index) => {
        return (
          <ButtonGroup key={index*123} size='sm'>
            {
              item.map((item, index) => {
                return (
                      <Button style={{margin: "1px"}} key={index} variant={isSelected(item) ? "secondary" : "outline-secondary"} onClick={
                        () => selectSubCategory(item)
                        }>{item.label}</Button>
                      )
                })
            }

          </ButtonGroup>
        )
      }
    ))
  }

  return (
    <>           
      <Container className='mb-3 mt-1 p-2 border rounded-3'>
        <Row className='mt-2'> 
          {subCategoryBar()}
        </Row>
      </Container>
      
      <Container>
        <Row>
            {
              subCategory ? <Col><DisplayListings subCategory={subCategory} filter={filter} /></Col>
              : <p style={{textAlign: "center"}}>Please Select a Category</p>
            }
        </Row>
      </Container>
       
      </> 
  )
}

export default CategoryPage
