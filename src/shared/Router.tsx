import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'
import Layout from './Layout'
import Search from '@/pages/Search/Search'
import RegisterMeeting from '@/pages/Meeting/RegisterMeeting'
import LoginModal from '@/components/modal/LoginModal'

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login/:service" element={<Login />} />
          <Route path="/meetings" element={<RegisterMeeting />} />
          <Route path="/auth" element={<LoginModal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
