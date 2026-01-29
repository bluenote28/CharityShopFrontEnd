import { useState } from 'react'
import DisplayListings from '../components/DisplayListings'
import { Row, Col, Container, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { SUB_CATEGORY_OPTIONS } from '../constants/categoryFilterOptions'
import formatItemsIntoRows from '../utilities/ItemsGridFormatter'

function CategoryPage() {

  const [charity, setCharity] = useState(null)
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category')
  const [subCategory, setSubCategory] = useState(null)
  const charitiesState = useSelector((state) => state.charities);
  const { error, loading, charities} = charitiesState;
  const CATEGORY_BUTTON_GROUP_PER_ROW = 5;
  const subCategoryOptions = formatItemsIntoRows(SUB_CATEGORY_OPTIONS[category], CATEGORY_BUTTON_GROUP_PER_ROW)
  const [categorySelected, setCategorySelected] = useState(false)

  function subCategoryBar(){

    return subCategoryOptions.map((item, index) =>{
      return (<ButtonGroup size='sm' key={index + 1}>
              {
                subCategoryOptions[index]?.map((item, index) => {
                    return (
                        <Button style={{margin: "1px"}} key={index} variant="outline-secondary" onClick={
                          () => {setSubCategory(item.value); setCategorySelected(true)}}>{item.label}</Button>
                    )          
                })
              }
              </ButtonGroup>
          )})
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
              categorySelected ? <Col><DisplayListings charityId={charity} subCategory={subCategory} /></Col>
              : <p style={{textAlign: "center"}}>Please Select a Category</p>
            }
        </Row>
      </Container>
       
      </> 
  )
}

export default CategoryPage