import { useState } from 'react'
import AlertBox from '../components/Alert'
import { Form, Button } from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux"
import { updateUserProfile } from '../actions/userActions'
import LoginFormContainer from '../components/LoginFormContainer'
import { useEffect } from 'react'
import FormPageLayout from '../components/FormPageLayout'

function ProfilePage() {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const userLogin = useSelector(state => state.userLogin)
    const { error, userInfo } = userLogin
    const dispatch = useDispatch()
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();


    const submithandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({id: userInfo.id, first_name: firstName, last_name: lastName, email: email}))
    }


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            setEmail(userInfo.email)
            setFirstName(userInfo.first_name)
            setLastName(userInfo.last_name)
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (error) {
            setAlert(error)
        }
    }, [error])

    return (
            <FormPageLayout>
                {alert && <AlertBox message={alert} />}
                    <LoginFormContainer>
                        <h1>Profile</h1>
                        <Form onSubmit={submithandler}>
                            <Form.Group controlId='firstName' className='mb-2'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required type='firstName' placeholder={firstName} value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='lastName' className='mb-2'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type='lastName' placeholder='Enter last name' value={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email' className='mb-2'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control required type='email' placeholder='Enter email' value={email} readOnly></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    </LoginFormContainer>
            </FormPageLayout>
    )
}

export default ProfilePage
