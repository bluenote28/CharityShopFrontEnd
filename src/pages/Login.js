import { useEffect, useState } from 'react'
import { useSelector} from "react-redux"
import LoginFormContainer from '../components/LoginFormContainer'
import FormPageLayout from '../components/FormPageLayout'
import AlertBox from '../components/Alert'
import GoogleLoginButton from '../components/GoogleLoginButton'

function LoginPage() {

    const userLogin = useSelector(state => state.userLogin)
    const { error, userInfo } = userLogin
    const [alert, setAlert ] = useState('')

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
                <p>Sign in with your Google account.</p>
                <GoogleLoginButton />
            </LoginFormContainer>
        </FormPageLayout>
    )
}

export default LoginPage
