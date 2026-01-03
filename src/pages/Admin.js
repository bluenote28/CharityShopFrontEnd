import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCharities } from '../actions/charityActions';
import CharitiesTable from '../components/CharitiesTable';
import SubmitCharityForm from '../components/SubmitCharityForm';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AdminReport from '../components/AdminReport';
import NormalSpinner from '../components/Spinner';
import AlertBox from '../components/Alert';

function AdminPage() {

   const dispatch = useDispatch();
   const charitiesState = useSelector((state) => state.charities);
   const { error, loading, charities} = charitiesState;

    useEffect(() => {
        dispatch(getCharities());
    }, [dispatch])
      

  if (loading){
    return <NormalSpinner />
  }
  else if (error){
    return <AlertBox message={error} />
  }
  else {
    return (
        <Col>
                <Row className='mt-3 border rounded-3 mx-5 px-3'>
                        <h4 className='mt-2' style={{textAlign: 'center'}}> Charities Database</h4>
                        <CharitiesTable data={charities} />     
                </Row>

                <Row className='w-50 mt-3 m-auto border rounded-3 px-3'>
                        <h4 className='mt-2' style={{textAlign: 'center'}}>Enter or Update a Charity</h4>
                        <SubmitCharityForm />
                </Row>

                <Row className='w-50 mt-3 mb-5 m-auto border rounded-3 px-3'>
                        <h4 className='mt-2' style={{textAlign: 'center'}}>Database Report</h4>
                        <AdminReport />
                </Row>
        </Col>
    )
  }
}

export default AdminPage