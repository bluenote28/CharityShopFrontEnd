import DisplayListings from '../components/DisplayListings'
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { FILTER_OPTIONS } from '../constants/categoryFilterOptions'

function CategoryPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category')
  const subCategory = searchParams.get('subCategory')
  const filter = searchParams.get('filter')
  const subCategoryOptions = FILTER_OPTIONS[category] || []

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
    return subCategoryOptions.map((item, index) => (
      <Button
        key={index}
        size="sm"
        className="m-1"
        variant={isSelected(item) ? "secondary" : "outline-secondary"}
        onClick={() => selectSubCategory(item)}
      >
        {item.label}
      </Button>
    ))
  }

  return (
    <>           
      <Container className='mb-3 mt-1 p-2 border rounded-3'>
        <Row className='mt-2'>
          <Col className="d-flex flex-wrap">
            {subCategoryBar()}
          </Col>
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
