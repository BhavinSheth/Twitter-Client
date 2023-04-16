import { GoogleOAuthProvider } from '@react-oauth/google'
import './googleLoginBtn.css'

const GoogleLogin = ({ children }) => {
  return (
    <div className="googleLogin">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
    </div>
  )
}

export default GoogleLogin
