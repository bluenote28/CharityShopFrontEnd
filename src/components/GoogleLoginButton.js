import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GOOGLE_CLIENT_ID } from '../constants/apiContants'
import { googleLogin } from '../actions/userActions'

function GoogleLoginButton() {
  const dispatch = useDispatch()
  const buttonRef = useRef(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    function renderButton() {
      if (cancelled || !buttonRef.current || !window.google?.accounts?.id) {
        return false
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (result) => {
          if (result?.credential) {
            dispatch(googleLogin(result.credential))
          }
        },
      })
      buttonRef.current.innerHTML = ''
      const width = Math.max(200, Math.min(buttonRef.current.offsetWidth || 280, 400))
      window.google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        width,
      })
      return true
    }

    if (renderButton()) {
      return () => {
        cancelled = true
      }
    }

    let script = document.getElementById('google-gsi-client')
    if (!script) {
      script = document.createElement('script')
      script.id = 'google-gsi-client'
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      document.head.appendChild(script)
    }

    const onLoad = () => {
      if (!renderButton() && !cancelled) {
        setError('Google sign-in did not initialize.')
      }
    }
    const onError = () => {
      if (!cancelled) {
        setError('Could not load Google sign-in.')
      }
    }

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)
    return () => {
      cancelled = true
      script.removeEventListener('load', onLoad)
      script.removeEventListener('error', onError)
    }
  }, [dispatch])

  return (
    <div className="google-login">
      <div ref={buttonRef} className="google-login-button" />
      {error && <p className="text-danger mt-2 mb-0">{error}</p>}
    </div>
  )
}

export default GoogleLoginButton
