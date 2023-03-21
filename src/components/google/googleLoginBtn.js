import { GoogleOAuthProvider } from '@react-oauth/google'
import { Default } from 'react-toastify/dist/utils'

const GOOGLE_CLIENT_ID =
  '1090090266803-m8vlo8s7h6tapjjf3heu46pt5pokdr4t.apps.googleusercontent.com'

const GoogleLogin = () => {
  return (
    <div className="googleLogin">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} />
    </div>
  )
}

export default GoogleLogin
