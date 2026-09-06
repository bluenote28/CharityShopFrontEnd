import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useRef, useEffect } from 'react';
import { isValidCharityId, isValidCharityDescription, isValidCharityName } from '../utilities/validators';
import AlertBox from './Alert';
import { addCharity, updateCharity } from '../actions/charityActions';
import { useDispatch, useSelector } from 'react-redux';

function SubmitCharityForm() {

 const [charityId, setCharityId] = useState('');
 const [description, setDescription] = useState('');
 const [name, setName] = useState('');
 const [imageUrl, setImageUrl ] = useState('');
 const [donationUrl, setDonationUrl ] = useState('');
 const [alert, setAlert] = useState(null);
 const dispatch = useDispatch()
 const { charities } = useSelector((state) => state.charities)
 const alertTimeoutRef = useRef(null)

 useEffect(() => {
    return () => {
        if (alertTimeoutRef.current) {
            clearTimeout(alertTimeoutRef.current)
        }
    }
 }, [])

 const showAlert = (message, variant = 'primary') => {
    setAlert({ message, variant })
    if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current)
    }
    alertTimeoutRef.current = setTimeout(() => {
        setAlert(null)
        alertTimeoutRef.current = null
    }, 4000)
 }

 const resetForm = () => {
    setCharityId('')
    setName('')
    setDescription('')
    setImageUrl('')
    setDonationUrl('')
 }

 const handleSubmit = async (e) => {

    e.preventDefault();

    if (validateCharityInput()){
        if ((charities || []).some((charity) => String(charity.id) === String(charityId))) {
            showAlert("A charity with this ID already exists. Use Update instead.")
            return
        }
        try {
            await dispatch(addCharity({id: charityId, name: name, description: description, image_url: imageUrl, donation_url: donationUrl}));
            resetForm()
            showAlert('Charity added successfully.', 'success')
        } catch (error) {
            showAlert(error.message || 'Failed to add charity')
        }
    }
  }

  const handleUpdate = async () => {

   if (validateCharityInput()){
      try {
          await dispatch(updateCharity({id: charityId, name: name, description: description, image_url: imageUrl, donation_url: donationUrl}));
          showAlert('Charity updated successfully.', 'success')
      } catch (error) {
          showAlert(error.message || 'Failed to update charity')
      }
     }
  }

  const validateCharityInput = () =>{

        let validCharityID = isValidCharityId(charityId)
        let validCharityDescription = isValidCharityDescription(description)
        let validCharityName = isValidCharityName(name)

        if (!validCharityID){
            showAlert("Please enter a valid charity ID");
            return false
        }
        else if (!validCharityDescription){
            showAlert("Please enter a valid charity description");
            return false
        }
        else if (!validCharityName){
            showAlert("Please enter a valid charity name");
            return false
        }
        else{
          return true;
        }
  }

  return (
        <>
            {alert && <AlertBox message={alert.message} variant={alert.variant} />}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Charity ID</Form.Label>
                <Form.Control type="id" placeholder="enter ebay charity id" value={charityId} onChange={(e) => setCharityId(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Charity Name</Form.Label>
                <Form.Control type="name" placeholder="enter charity name" value={name} onChange={(e) => setName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="description" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>

               <Form.Group className="mb-3">
                <Form.Label>Donation URL</Form.Label>
                <Form.Control type="donationUrl" placeholder="donation url" value={donationUrl} onChange={(e) => setDonationUrl(e.target.value)} />
              </Form.Group>

               <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="imageUrl" placeholder="image url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
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