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

      <Container className='d-flex justify-content-center mb-3 mt-1'>
        <Row>
            <Col>            
            <Select className="mx-1 w-100" options={allCharitites} onChange={(e) => setCharity(e.value)} defaultValue={{value: null, label: "All Charities"}} /> 
            </Col> 
            <Col>
            <Select className="mx-1 w-100" options={SUB_CATEGORY_OPTIONS[category]} onChange={(e) => setSubCategory(e.value)} defaultValue={{value: null, label: "All Categories"}} />
            </Col>           
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