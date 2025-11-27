import Spinner from 'react-bootstrap/Spinner';

function NormalSpinner() {
  return (
     <div className='d-flex justify-content-center align-items-center h-100'>
        <Spinner animation="border" role="status" variant='light'>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
  );
}

export default NormalSpinner;