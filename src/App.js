import './index.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
import Profile from './pages/profile/profile'
import ProfileOutlet from './pages/profile/ProfileOutlet'
import SingleTweetPage from './pages/single-tweet/singlePageTweet'

function App() {
  const { isLoggedIn } = useAppContext()
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="/" Component={sharedLayout}>
        <Route path="/:userName" Component={Profile}>
          <Route index Component={ProfileOutlet}></Route>
          <Route path=":param" Component={ProfileOutlet}></Route>
        </Route>
        <Route
          path="/:userName/status/:tweetId"
          Component={SingleTweetPage}
        ></Route>

        <Route path="explore" Component={Explore}>
          <Route path={`tabs/:category`} Component={Tabs}></Route>
        </Route>

        <Route path="search" element={<h1>Search</h1>}>
          <Route path={`tabs/:category`} Component={Tabs}></Route>
        </Route>

        <Route path="notifications" element={<h1>Notification</h1>}>
          <Route path={`tabs/:category`} Component={Tabs}></Route>
        </Route>

        <Route
          path="home"
          element={<Protected protectedComponent={<Home />} />}
        ></Route>
      </Route>

      <Route path="/register" Component={Register}></Route>

      <Route path="/login" Component={Login}></Route>

      <Route path="*" Component={NotFound}></Route>
    </Routes>
  )
}

export default App
