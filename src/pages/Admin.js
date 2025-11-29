import { useState, useEffect } from 'react'
import { CharityApi }  from '../utilities/ApiClient';
import CharitiesTable from '../components/CharitiesTable';
import SubmitCharityForm from '../components/SubmitCharityForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AdminReport from '../components/AdminReport';

function AdminPage() {

   const [charities, setCharities] = useState([])
   const client = new CharityApi();

    useEffect(() => {

    client.getAllData().then((data) => {
        setCharities(data)
    });
  
    })
      

  return (
   
      <Col>
            <Row className='w-50 mt-3 m-auto border rounded-3'>
                <Container>
                    <h4 className='mt-2' style={{textAlign: 'center'}}> Charities Database</h4>
                    <CharitiesTable data={charities} />
                </Container>
            </Row>


            <Row className='w-50 mt-3 m-auto border rounded-3'>
                <Container>
                    <h4 className='mt-2' style={{textAlign: 'center'}}>Enter or Update a Charity</h4>
                    <SubmitCharityForm />
                </Container>
            </Row>
            <Row className='w-50 mt-3 mb-5 m-auto border rounded-3'>
                <Container>
                    <h4 className='mt-2' style={{textAlign: 'center'}}>Database Report</h4>
                    <AdminReport />
                </Container>
            </Row>
      </Col>
     

  )
}

export default AdminPage