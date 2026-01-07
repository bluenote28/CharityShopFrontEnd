import { useState, useEffect } from 'react'
import Select from 'react-select'
import DisplayListings from '../components/DisplayListings'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from '../components/Alert'
import { useSearchParams } from 'react-router-dom';
import { getCharities } from '../actions/charityActions';
import { SUB_CATEGORY_OPTIONS } from '../constants/categoryFilterOptions'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

function CategoryPage() {

  const [charity, setCharity] = useState(null)
  const [allCharitites, setAllCharitites] = useState([])
  const [errorMessage, setErrorMessage ] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category')
  const [subCategory, setSubCategory] = useState(null)
  const dispatch = useDispatch();
  const charitiesState = useSelector((state) => state.charities);
  const { error, loading, charities} = charitiesState;

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

  return (
    <>
    {errorMessage && <AlertBox message={errorMessage}/>}.             
    
      <Container>
        <Row>
            <Col>
                <h1 style={{textAlign:"center"}}>{category}</h1>
            </Col>
        </Row>
      </Container>

      <Container className='mb-3 mt-1'>
        <Row>     
        <Select className="mx-1 w-100" options={allCharitites} onChange={(e) => setCharity(e.value)} defaultValue={{value: null, label: "All Charities"}} /> 
        </Row>        
        <Row className='mt-2'>   
            <ButtonGroup size='sm'>
                {
                  SUB_CATEGORY_OPTIONS[category]?.map((item, index) => {
                      return (
                          <Button key={index} variant="primary" onClick={() => setSubCategory(item.value)}>{item.label}</Button>
                      )          
                  })
                }
            </ButtonGroup>
        </Row>
      </Container>
      
      <Container>
        <Row>
            <Col><DisplayListings charityId={charity} category={category} subCategory={subCategory} /></Col>
        </Row>
      </Container>
       
      </> 
  )
}

export default CategoryPage