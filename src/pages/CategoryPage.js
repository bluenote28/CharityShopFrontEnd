import { useState, useEffect } from 'react'
import Select from 'react-select'
import DisplayListings from '../components/DisplayListings'
import { Row, Col, Container, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from '../components/Alert'
import { useSearchParams } from 'react-router-dom';
import { getCharities } from '../actions/charityActions';
import { SUB_CATEGORY_OPTIONS } from '../constants/categoryFilterOptions'
import formatItemsIntoRows from '../utilities/ItemsGridFormatter'

function CategoryPage() {

  const [charity, setCharity] = useState(null)
  const [allCharitites, setAllCharitites] = useState([])
  const [errorMessage, setErrorMessage ] = useState(null)
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category')
  const [subCategory, setSubCategory] = useState(null)
  const dispatch = useDispatch();
  const charitiesState = useSelector((state) => state.charities);
  const { error, loading, charities} = charitiesState;
  const CATEGORY_BUTTON_GROUP_PER_ROW = 5;
  const subCategoryOptions = formatItemsIntoRows(SUB_CATEGORY_OPTIONS[category], CATEGORY_BUTTON_GROUP_PER_ROW)
  const [categorySelected, setCategorySelected] = useState(false)

  useEffect(() => {
    if (!charities || charities.length === 0){
      dispatch(getCharities());
    }
  }, [dispatch])

  useEffect(() => {
    
    if (charities){
            
        let select_options = [{value: null, label: "All Charities"}];

        for (let i = 0; i < charities.length; i++) {
          select_options.push({ value: charities[i].id, label: charities[i].name })
        }              
        setAllCharitites(select_options);
      }
      else{
        setErrorMessage("Error retrieving charities from server")
      }
  }, [charities])

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
    {errorMessage && <AlertBox message={errorMessage}/>}.             

      <Container className='mb-3 mt-1 p-2 border rounded-3' style={{backgroundColor: "#fbf9f9ff"}}>
        <Row>     
        <Select className="mx-1 w-100" options={allCharitites} onChange={(e) => setCharity(e.value)} defaultValue={{value: null, label: "All Charities"}} /> 
        </Row>        
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