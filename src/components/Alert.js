import Alert from 'react-bootstrap/Alert';

function AlertBox(props) {
  return (
    <>  
        <Alert variant={props.variant || 'primary'}>
            {props.message}
        </Alert>
    
    </>
  );
}

export default AlertBox;