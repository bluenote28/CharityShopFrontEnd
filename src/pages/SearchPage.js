import { useState, useEffect } from 'react'
import Select from 'react-select'
import DisplayListings from '../components/DisplayListings'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from '../components/Alert'
import { useSearchParams } from 'react-router-dom';
import { CATEGORY_OPTIONS } from '../constants/categoryFilterOptions'
import { getCharities } from '../actions/charityActions';
import SearchBar from '../components/SearchBar';

function SearchPage() {

  const [charity, setCharity] = useState(null)
  const [allCharitites, setAllCharitites] = useState([])
  const [errorMessage, setErrorMessage ] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('search')) 
  const [category, setCategory] = useState(searchParams.get('category'))
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
    {errorMessage && <AlertBox message={errorMessage}/>}
  
      <Row>
        <Col>
            <Container className='mt-4 mb-1'>
                <SearchBar />
            </Container>
            
            <Container className='d-flex justify-content-start mb-3 mt-1'>
                    
              <Select className="mx-1 w-25" options={allCharitites} onChange={(e) => setCharity(e.value)} defaultValue={{value: null, label: "All Charities"}} /> 

              <Select className="w-25" options={CATEGORY_OPTIONS} onChange={(e) => setCategory(e.value)} defaultValue={{value: category, label: 'Select Category'}} /> 
                     
            </Container>
        </Col>
      </Row>

      <DisplayListings charityId={charity} category={category} search={searchText}/>
       
      </> 
  )
}

export default SearchPage