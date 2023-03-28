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

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
