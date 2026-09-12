import DisplayListings from '../components/DisplayListings'
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { FILTER_OPTIONS } from '../constants/categoryFilterOptions'
import FavoriteCharitiesFilter from '../components/FavoriteCharitiesFilter'

function CategoryPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category')
  const subCategory = searchParams.get('subCategory')
  const filter = searchParams.get('filter')
  const search = searchParams.get('search')
  const subCategoryOptions = FILTER_OPTIONS[category] || []

  function selectSubCategory(item) {
    const params = new URLSearchParams()
    if (category) {
      params.set('category', category)
    }
    if (item.subCategory) {
      params.set('subCategory', item.subCategory)
    }
    if (item.filter) {
      params.set('filter', item.filter)
    }
    if (item.search) {
      params.set('search', item.search)
    }
    if (searchParams.get('favoriteCharities') === '1') {
      params.set('favoriteCharities', '1')
    }
    setSearchParams(params)
  }

  function isSelected(item) {
    if (item.subCategory !== subCategory) {
      return false;
    }
    if ((item.filter || null) !== (filter || null)) {
      return false;
    }
    return (item.search || null) === (search || null);
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
        <Row className="mt-2">
          <Col>
            <FavoriteCharitiesFilter />
          </Col>
        </Row>
      </Container>
      
      <Container>
        <Row>
            {
              subCategory ? <Col><DisplayListings subCategory={subCategory} filter={filter} search={search} /></Col>
              : <p style={{textAlign: "center"}}>Please Select a Category</p>
            }
        </Row>
      </Container>
       
      </> 
  )
}

export default CategoryPage
