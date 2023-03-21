import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppProvider } from './context/appContext'
// import './index.css';
import { ToastContainer, Zoom } from 'react-toastify'
import Spinner from './components/spinner/spinner'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import GoogleLogin from './components/google/googleLoginBtn'

const GOOGLE_CLIENT_ID =
  '1090090266803-m8vlo8s7h6tapjjf3heu46pt5pokdr4t.apps.googleusercontent.com'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Spinner />
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AppProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      transition={Zoom}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>,
  document.getElementById('root')
)
