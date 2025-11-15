import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector} from "react-redux"
import { login } from '../actions/userActions'
import LoginFormContainer from '../components/LoginFormContainer'
import FormPageLayout from '../components/FormPageLayout'
import AlertBox from '../components/Alert'

function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const dispatch = useDispatch()
    const [alert, setAlert ] = useState('')
    const RESET_URL = 'http://127.0.0.1:8000/password_reset/'
    
    const submithandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    if (userInfo) {
        window.location.href = '/'
    }

    useEffect(() => {

        if (error){
                    setAlert(error)
                  }
                
        }, [error])


    return (
        <FormPageLayout>
            <LoginFormContainer>
                <h1>Sign In</h1>
                {alert && <AlertBox message={alert} />}
                <Form onSubmit={submithandler}>
                    <Form.Group controlId='email' className='mb-2'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'className='mt-2'>
                        Sign In
                    </Button>
                </Form>

                <Row className='py-1 mt-2'>
                    <Col>
                        <Container className='d-flex'>
                             <p style={{marginRight: '10px'}}>New Customer?</p> <Link to={'/register'}>Register</Link>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container className='d-flex'>
                             <p style={{marginRight: '10px'}}>Forgot Password?</p> <Link to={RESET_URL}>Reset Password</Link>
                        </Container>
                    </Col>
                </Row>

            </LoginFormContainer>
        </FormPageLayout>
    )   
}

export default LoginPage