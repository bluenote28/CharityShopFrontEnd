import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { CharityApi } from '../utilities/ApiClient'
import { isValidCharityId, isValidCharityDescription, isValidCharityName } from '../utilities/validators';
import AlertBox from './Alert';

function SubmitCharityForm() {

 const [charityId, setCharityId] = useState('');
 const [description, setDescription] = useState('');
 const [name, setName] = useState('');
 const [alert, setAlert] = useState(null);
 const client = new CharityApi();

 const handleSubmit = (e) => {

    e.preventDefault();

    let validCharityID = isValidCharityId(charityId)
    let validCharityDescription = isValidCharityDescription(description)
    let validCharityName = isValidCharityName(name)

    if (validCharityID && validCharityDescription && validCharityName){
      
        client.add({id: charityId, name: name, description: description});
        window.location.reload();
    }
    else{
        if (!validCharityID){
            setAlert("Please enter a valid charity ID");
        }
        else if (!validCharityDescription){
            setAlert("Please enter a valid charity description");
        }
        else if (!validCharityName){
            setAlert("Please enter a valid charity name");
        }
    }

  }

  const handleUpdate = () => {

   if (isValidCharityId(charityId) && isValidCharityDescription(description) && isValidCharityName(name)){

        client.update({id: charityId, name: name, description: description});
        window.location.reload();
     }
   else{
        setAlert("Please enter valid data");
    }
  }

  return (
        <>
            {alert && <AlertBox message={alert} />}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Charity ID</Form.Label>
                <Form.Control type="id" placeholder="enter ebay charity id" onChange={(e) => setCharityId(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Charity Name</Form.Label>
                <Form.Control type="name" placeholder="enter charity name" onChange={(e) => setName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="description" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>
              <div className='d-flex justify-content-between mb-3'>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Button variant="primary" type="button" onClick={handleUpdate}>
                    Update
                  </Button>
            </div>
            </Form>

        </>
  );
}

export default SubmitCharityForm;