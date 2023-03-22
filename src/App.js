import './index.css'
import { Routes, Route } from 'react-router-dom'
import Explore from './pages/explore/explore'
import Register from './pages/register/register'
import Login from './pages/login/login'
import 'react-toastify/dist/ReactToastify.css'
import NotFound from './pages/not-found/not-found'
import sharedLayout from './pages/sharedLayout'
import Tabs from './pages/explore/tabs/tabs'
import Home from './pages/home/home'
import Protected from './components/Protected'
import { useAppContext } from './context/appContext'

function App() {
  return (
    <Routes>
      <Route path="/" Component={sharedLayout}>
        <Route path="explore" Component={Explore}>
          {/* <Route index element={<Tabs />}></Route> */}

          <Route path={`tabs/:category`} Component={Tabs}></Route>
        </Route>

        <Route path="home" element={<Protected Component={Home} />}></Route>
      </Route>

      <Route path="/register" Component={Register}></Route>

      <Route path="/login" Component={Login}></Route>

      <Route path="*" Component={NotFound}></Route>
    </Routes>
  )
}

export default App
