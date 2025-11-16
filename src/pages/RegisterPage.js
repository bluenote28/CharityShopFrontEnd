import { useEffect, useState } from 'react'
import AlertBox from '../components/Alert'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from "react-redux"
import { register } from '../actions/userActions'
import LoginFormContainer from '../components/LoginFormContainer'
import FormPageLayout from '../components/FormPageLayout'
import { isValidPassword } from '../utilities/validators'
import NormalSpinner from '../components/Spinner'

function RegisterPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('') 
    const [lastName, setLastName] = useState('') 
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const dispatch = useDispatch()
    const [alert, setAlert] = useState(null);
    
    const submithandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword){
              setAlert("Passwords do not match");
        }
        else if (!isValidPassword(password)){
             setAlert("Please enter a valid password")
        }
        else{
              dispatch(register(firstName, lastName, email, password))
        }
    }

    
    useEffect(() => {

        if (error){
            setAlert(error)
        }

        if (userInfo){

            if(userInfo.detail){
                console.log(userInfo.detail)
                setAlert(userInfo.detail)
            }
            else{
                window.location.href = '/'
            }

        }
    }, [userInfo, error])

     if (loading){

        return (
           <NormalSpinner />  
        )
    }
    
    return (
        <>
        <FormPageLayout>
        {alert && <AlertBox message={alert} />}
                <LoginFormContainer>
                    <h1>Register</h1>
                    <Form onSubmit={submithandler}>
                        <Form.Group controlId='firstName' className='mb-2'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required type='firstName' placeholder='Enter first name' value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='lastName' className='mb-2'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type='lastName' placeholder='Enter last name' value={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' className='mb-2'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control required type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password' className='mb-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='cofirmPassword' className='mb-2'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type='password' placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>

                        <div className='mt-2'>
                            <Button type='submit' variant='primary'>
                                Register
                            </Button>
                        </div>
                    </Form>

                </LoginFormContainer>
            </FormPageLayout>
        </>
    )   
}

export default RegisterPage