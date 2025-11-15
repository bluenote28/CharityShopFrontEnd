import { useState, useEffect } from 'react'
import Select from 'react-select'
import DisplayListings from '../components/DisplayListings'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { CharityApi } from '../utilities/ApiClient'
import AlertBox from '../components/Alert'
import { useSearchParams } from 'react-router-dom';
import { CATEGORY_OPTIONS } from '../constants/categoryFilterOptions'
import { Form } from 'react-bootstrap'

function SearchPage() {

  const [charity, setCharity] = useState(null)
  const [allCharitites, setAllCharitites] = useState([])
  const [errorMessage, setErrorMessage ] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('search')) 
  const [category, setCategory] = useState(searchParams.get('category'))
  const client = new CharityApi();

  useEffect(() => {
  
          client.getAllData().then((data) => {

          if (data){
                  
              let select_options = [{value: null, label: "All Charities"}];

              for (let i = 0; i < data.length; i++) {
                select_options.push({ value: data[i].id, label: data[i].name })
              }
              
              setAllCharitites(select_options);
            }
            else{

              setErrorMessage("Error retrieving charities from server")

            }
          })
  }, [])

  return (
    <>
    {errorMessage && <AlertBox message={errorMessage}/>}
    <div>
      <Row>
        <Col>
            <Container className='d-flex justify-content-center mb-3 mt-3'>
                    
                        <Select options={allCharitites} onChange={(e) => setCharity(e.value)} defaultValue={{value: null, label: "All Charities"}} /> 
        
                        <Select options={CATEGORY_OPTIONS} onChange={(e) => setCategory(e.value)} defaultValue={{value: category, label: 'Select Category'}} /> 

                        <Form.Control className='w-50' type="search" placeholder="Search Items" onChange={(e) => setSearchText(e.target.value)}/>
                     
            </Container>
  
            <Container>
                      <DisplayListings charityId={charity} category={category} search={searchText}/>  
            </Container> 
        </Col>
      </Row>
    
      </div> 
      </> 
  )
}

export default SearchPage